import { defineStore } from 'pinia'
import IPurchase from '~/interfaces/Purchases/IPurchase'
import IPurchaseForm from '~/interfaces/Purchases/IPurchaseForm'
import IPurchaseFormItem from '~/interfaces/Purchases/IPurchaseFormItem'
import IPurchaseItem from '~/interfaces/Purchases/IPurchaseItem'
import IPurchasePayment from '~/interfaces/Purchases/IPurchasePayment'
import IItemUnit from '~/interfaces/ItemUnits/IItemUnit'
import IItemBasePrice from '~/interfaces/ItemBasePrices/IItemBasePrice'
import IItem from '~/interfaces/Items/IItem'
import { create, createPurchasePayment, get, update, getItem, submitAdminReceivingPurchaseItem } from '~/repositories/purchase'
import { getAll } from '~/repositories/itemBasePrice'
import { getAllWithSelf } from '~/repositories/itemUnit'

// const purchaseInitialValue = {
//   id: 1,
//   invoice_amount: 1000,
//   outstanding_amount: 1000,
//   returned_amount: 100,
//   supplier_name: 'SUPPLIER A',
//   invoice_date: '2023-05-02',
//   due_date: '2023-05-01',
//   invoice_number: 'SDF/456/GGGG',
//   items: [] as IPurchaseItem[],
//   payments: [] as IPurchasePayment[]
// } as IPurchase

// const purchaseFormInitialValue = {
//   tax_invoice_number: 'ASD',
//   invoice_date: '2022-01-01',
//   due_date: '2022-01-01',
//   invoice_number: '123',
//   paid_amount: null,
//   supplier_id: null,
//   add_payment: 0,
//   account_id: 0,
//   add_expedition: 0,
//   description: 'asdasd',
//   expedition_id: 0,
//   receive_date: '2022-01-01',
//   report_date: '2022-01-01',
//   shipping_price: null,
//   invoice_amount: 0,
//   outstanding_amount: 0,
//   returned_amount: 0,
//   items: [] as IPurchaseFormItem[],
//   payments: [] as IPurchasePayment[]
// } as IPurchaseForm

export const usePurchaseStore = defineStore('purchase', {
  state: () => ({
    purchases: [] as IPurchase[],
    purchase: Object.assign({ paid_amount: null, items: [] }) as IPurchase,
    purchaseForm: Object.assign({ paid_amount: null, include_tax: 0, items: [] }) as IPurchaseForm,
    purchaseItems: [] as IPurchaseItem[],
    loading: false,
  }),
  actions: {
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const purchaseId = nuxt.$getRouteParam('purchase_id') ?? nuxt.$getRouteParam('purchase_return_id')
      if (purchaseId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(purchaseId))
          success = response.success
          message = response.message
          this.purchase = Object.assign({}, response.data)
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async getItem(itemId: number, warehouseReceivingItemId: number, warehouseId: number) {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any; let success = false; let message = ''
      try {
        response = await getItem(itemId)
        success = response.success
        message = response.message
        response.data.data.map((obj: any) => {
          obj.receiving_quantity = 0
          obj.warehouse_receiving_item_id = warehouseReceivingItemId
          obj.warehouse_id = warehouseId
          return obj;
        })
        this.purchaseItems = response.data.data
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
    async submitReceivingItem() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        response = await submitAdminReceivingPurchaseItem(this.purchaseItems)
        success = response.success
        message = response.message
        response.data.map((obj: any) => {
          obj.received_quantity = obj.received_quantity + obj.receiving_quantity
          obj.outstanding_quantity = obj.outstanding_quantity - obj.receiving_quantity
          obj.receiving_quantity = 0
          return obj;
        })
        this.purchaseItems = response.data
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
      return success
    },
    async addItem(item: IItem) {
      let itemUnits: IItemUnit[] | undefined;
      let basePrices: IItemBasePrice[] | undefined;
      let checkTtem = this.purchaseForm.items.filter(n => n.item_id == item.id)
      if (checkTtem.length == 0) {
        const response: any = await getAllWithSelf(undefined, item.id)
        if (response.data.data) {
          itemUnits = response.data.data
        }
        const response2: any = await getAll(item.id)
        if (response2.data.data) {
          basePrices = response2.data.data
          const nuxt = useNuxtApp()
          basePrices?.map(n => {
            n.purchase_price = nuxt.$formatPrice(n.purchase_price)
          })
        }
      }
      let purchaseFormItem: IPurchaseFormItem = {
        item_id: item.id,
        item_name: item.name,
        item_code: item.code,
        unit_name: item.unit_name ?? '',
        selected_unit_name: item.unit_name ?? '',
        price: null,
        quantity: null,
        total_price: null,
        selected_quantity: null,
        item_units: itemUnits,
        base_prices: basePrices,
        sub_total_price: 0,
        tax: 0
      }
      if (this.purchaseForm.items) {
        // Check if item existed
        const findResult = this.purchaseForm.items.findIndex(item => item.item_id === purchaseFormItem.item_id)
        if (findResult === -1) {
          // If item does not exist add to the beginning of array
          this.purchaseForm.items.unshift(purchaseFormItem)
        } else {
          // Skip if existed
        }
      } else {
        this.purchaseForm.items = []
        this.purchaseForm.items.unshift(purchaseFormItem)
      }
    },
    removeItem(purchaseFormItem: IPurchaseFormItem) {
      this.purchaseForm.items = this.purchaseForm.items.filter(item => item.item_id !== purchaseFormItem.item_id)
    },
    filterItem(supplier_id: number) {
      this.purchaseForm.items = this.purchaseForm.items.filter(item => item.supplier_id == supplier_id)
    },
    resetForm() {
      this.purchaseForm = Object.assign({ paid_amount: null, include_tax: 0, items: [] })
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        if (!this.purchaseForm.report_date) this.purchaseForm.report_date = null
        if (!this.purchaseForm.paid_amount) this.purchaseForm.paid_amount = 0
        if (!this.purchaseForm.shipping_price) this.purchaseForm.shipping_price = 0
        this.purchaseForm.invoice_amount = this.purchaseForm.items.reduce((total: number, item: IPurchaseFormItem) => total + (Number(item.price) * Number(item.quantity)), 0)
        this.purchaseForm.returned_amount = this.purchaseForm.invoice_amount - this.purchaseForm.paid_amount
        this.purchaseForm.outstanding_amount = 0
        let purchaseId = null
        if (this.purchaseForm.id) {
          purchaseId = this.purchaseForm.id
          response = await update(this.purchaseForm.id, this.purchaseForm)
        } else {
          response = await create(this.purchaseForm)
          purchaseId = response.data.id
        }
        success = response.success
        message = response.message
        await nuxt.$navigate(`stores/{storeId}/purchases/${purchaseId}`)
        this.resetForm()
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    async submitPurchasePayment() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        const purchaseId = nuxt.$getRouteParam('purchase_id')
        response = await createPurchasePayment(purchaseId, this.purchaseForm)
        success = response.success
        message = response.message
        this.purchase.outstanding_amount -= parseInt(this.purchaseForm.paid_amount) ?? 0
        this.purchase.paid_amount += parseInt(this.purchaseForm.paid_amount) ?? 0
        if ((this.purchase.invoice_amount - this.purchase.paid_amount) == 0) {
          this.purchase.payment_status = 'PAID'
        }
        this.purchaseForm.paid_amount = null
        this.purchaseForm.account_id = null

      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
  },
  getters: {
    getTotalItemPrice(): number {
      let totalPrice = 0
      if (this.purchaseForm.items) {
        this.purchaseForm.items.forEach(item => {
          totalPrice += item.total_price ?? 0
        })
      }
      return totalPrice
    },
    getTotalTax(): number {
      let tax = 0
      if (this.purchaseForm.items) {
        this.purchaseForm.items.forEach(item => {
          tax += item.tax
        })
      }
      return tax
    },
    getDiscountValue(): number {
      let totalDiscount = 0
      if (this.purchaseForm.items) {
        this.purchaseForm.items.forEach(item => {
          totalDiscount += item.discount_value ?? 0
        })
      }
      return totalDiscount
    },
    getDiscountPercentage(): number {
      let totalItemPrice = 0
      if (this.purchaseForm.items) {
        this.purchaseForm.items.forEach(item => {
          totalItemPrice += item.price ?? 0
        })
      }
      if (totalItemPrice == 0) {
        return 0
      } else {
        return 100 / (totalItemPrice / this.getDiscountValue)
      }
    },
    getTotalFormPaidAmount(): number {
      return this.purchaseForm.paid_amount ?? 0
    },
    getTotalOutstandingAmount(): number {
      return this.getTotalItemPrice - this.getTotalFormPaidAmount
    }
  }
})