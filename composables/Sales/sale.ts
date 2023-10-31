import { defineStore } from 'pinia'
import ISale from '~/interfaces/Sales/ISale'
import ISaleForm from '~/interfaces/Sales/ISaleForm'
import ISaleFormItem from '~/interfaces/Sales/ISaleFormItem'
import IItemSellPrice from '~/interfaces/Items/IItemSellPrice'
import { create, createSalePayment, get, getSaleitems, update, requestOtp, verificationOtp } from '~/repositories/sale'
import { getAllWithSelf } from '~/repositories/itemUnit'
import { saleInvoice } from '~/composables/Sales/saleInvoice'
import { deliveryOrderInvoice } from '~/composables/DeliveryOrders/deliveryOrderInvoice'
const { data } = useAuth()

// const saleInitialValue = {
//   invoice_number: '',
//   account_id: 0,
//   date: '',
//   id: 1,
//   items: [] as ISaleFormItem[]
// } as ISale

// const saleFormInitialValue = {
//   invoice_number: '',
//   account_id: 0,
//   customer_id: 0,
//   account_name: '',
//   date: '',
//   paid_amount: null,
//   invoice_amount: 0,
//   payment_method: '',
//   add_payment: 0,
//   items: [] as ISaleFormItem[]
// } as ISaleForm

export const useSaleStore = defineStore('sale', {
  state: () => ({
    sale: Object.assign({ items: [], police_number: '' }) as ISale,
    saleForm: Object.assign({ items: [], police_number: '' }) as ISaleForm,
    loading: false,
  }),
  getters: {
    getTotalItemPrice(): number {
      let totalPrice = 0
      if (this.saleForm.items) {
        this.saleForm.items.forEach(item => {
          totalPrice += item.total_price
        })
      }
      return totalPrice
    },
    getTotalTax(): number {
      let tax = 0
      if (this.saleForm.items) {
        this.saleForm.items.forEach(item => {
          tax += item.tax
        })
      }
      return tax
    },
    getDiscountValue(): number {
      let totalDiscount = 0
      if (this.saleForm.items) {
        this.saleForm.items.forEach(item => {
          totalDiscount += item.discount_value ?? 0
        })
      }
      return totalDiscount
    },
    getDiscountPercentage(): number {
      let totalItemPrice = 0
      if (this.saleForm.items) {
        this.saleForm.items.forEach(item => {
          totalItemPrice += item.sell_price
        })
      }
      if (totalItemPrice == 0) {
        return 0
      } else {
        return 100 / (totalItemPrice / this.getDiscountValue)
      }
    },
    getTotalSaleFormPaidAmount(): number {
      return this.saleForm.paid_amount ?? 0
    },
    getTotalOutstandingAmount(): number {
      return this.getTotalItemPrice - this.getTotalSaleFormPaidAmount
    }
  },
  actions: {
    async addItem(itemSellPrice: IItemSellPrice) {
      let saleFormItem: ISaleFormItem = { ...itemSellPrice, quantity: 1, final_sell_price: itemSellPrice.sell_price, master_password: null, discount_percentage: null, discount_value: null, total_price: 0, item_units: [], sub_total_price: itemSellPrice.sell_price, tax: 0, loading: true }
      let itemUnits = this.saleForm.items.filter(n => n.item_id == itemSellPrice.item_id)

      if (this.saleForm.items) {
        // Check if item existed
        const findResult = this.saleForm.items.findIndex(saleItem => saleItem.item_stock_id === itemSellPrice.item_stock_id)
        if (findResult === -1) {
          // If item does not exist add to the beginning of array
          this.saleForm.items.unshift(saleFormItem)
        } else {
          // Skip if existed
        }
      } else {
        this.saleForm.items = []
        this.saleForm.items.unshift(saleFormItem)
      }

      if (itemUnits.length == 0) {
        const response: any = await getAllWithSelf(undefined, itemSellPrice.item_id)
        if (response.data.data) {
          itemUnits = response.data.data
        }
        let newItemUnitIndex = this.saleForm.items.findIndex(n => n.item_id == itemSellPrice.item_id)
        if (newItemUnitIndex) {
          this.saleForm.items[newItemUnitIndex].item_units = itemUnits
          this.saleForm.items[newItemUnitIndex].loading = false
        }
      }
    },
    removeItem(item: ISaleFormItem) {
      this.saleForm.items = this.saleForm.items.filter(saleItem => saleItem.item_stock_id !== item.item_stock_id)
    },
    resetForm() {
      this.saleForm = Object.assign({ items: [], police_number: '' }) as ISaleForm
    },
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const saleId = nuxt.$getRouteParam('sale_id') ?? nuxt.$getRouteParam('sale_return_id')
      if (saleId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(saleId))
          success = response.success
          message = response.message
          this.sale = Object.assign({}, response.data)
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        if (!this.saleForm.paid_amount) this.saleForm.paid_amount = 0
        this.saleForm.invoice_amount = this.saleForm.items.reduce((total: number, item: ISaleFormItem) => total + (Number(item.sell_price) * Number(item.quantity)), 0)
        if (this.saleForm.id) {
          response = await update(this.saleForm.id, this.saleForm)
        } else {
          response = await create(this.saleForm)
        }
        success = response.success
        message = response.message
        const saleId = response.data.id
        await nuxt.$navigate(`stores/{storeId}/sales/${saleId}`)
        this.resetForm()
      } catch (error: any) {
        message = error.data.message
        if (message == 'OTP') {
          const storeId = nuxt.$getRouteParam('store_id')
          const activeStore = data.value!.stores.find(store => store.id === parseInt(storeId))
          this.loading = false
          this.saleForm.whatsapp_number = activeStore?.whatsapp_number
          this.saleForm.requestOtpModal = true
        }
      }

      if (message != 'OTP') {
        this.loading = false
        nuxt.$notify(success, message)
      }
    },
    async submitRequestOtp(resend: number = 0) {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        if (!this.saleForm.paid_amount) this.saleForm.paid_amount = 0
        this.saleForm.invoice_amount = this.saleForm.items.reduce((total: number, item: ISaleFormItem) => total + (Number(item.sell_price) * Number(item.quantity)), 0)
        response = await requestOtp(this.saleForm)
        if (resend == 0) {
          this.saleForm.requestOtpModal = false
          this.saleForm.verificationOtpModal = true
        }

        success = response.success
        message = response.message
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    async submitVerificationOtp() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        if (!this.saleForm.paid_amount) this.saleForm.paid_amount = 0
        this.saleForm.invoice_amount = this.saleForm.items.reduce((total: number, item: ISaleFormItem) => total + (Number(item.sell_price) * Number(item.quantity)), 0)
        this.saleForm.otp_code = this.saleForm.otp_code.toLowerCase()
        response = await verificationOtp(this.saleForm)
        this.saleForm.verificationOtpModal = false

        success = response.success
        message = response.message
        const saleId = response.data.id
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/sales/${saleId}`)
      } catch (error: any) {
        message = error.data.message
        this.saleForm.otp_code = ''
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    async submitPurchasePayment() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        if (!this.saleForm.customer_id) this.saleForm.customer_id = 0
        const saleId = nuxt.$getRouteParam('sale_id')
        response = await createSalePayment(saleId, this.saleForm)
        success = response.success
        message = response.message
        this.sale.outstanding_amount -= parseInt(this.saleForm.paid_amount) ?? 0
        this.sale.paid_amount += parseInt(this.saleForm.paid_amount) ?? 0
        if ((this.sale.invoice_amount - this.sale.paid_amount) == 0) {
          this.sale.payment_status = 'PAID'
        }
        this.saleForm.paid_amount = null
        this.saleForm.account_id = null
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    async printSale(saleId: number) {
      this.loading = true
      const nuxt = useNuxtApp()

      let responseDetail = null as any; let success = false; let message = ''
      let responseItems = null as any;
      try {
        responseDetail = await get(saleId)
        responseItems = await getSaleitems(saleId, 'sale')
        saleInvoice(responseDetail.data, responseItems.data.data)
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
    async printDeliveryOrder(saleId: number) {
      this.loading = true
      const nuxt = useNuxtApp()

      let responseItems = null as any; let success = false; let message = ''
      try {
        responseItems = await getSaleitems(saleId, 'deliveryOrder')
        const storeId = nuxt.$getRouteParam('store_id')
        const activeStore = data.value!.stores.find(store => store.id === parseInt(storeId))
        deliveryOrderInvoice(responseItems.data.data, this.sale, activeStore)
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
  },
})