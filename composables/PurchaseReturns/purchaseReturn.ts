import { defineStore } from 'pinia'
import IForm from '~/interfaces/PurchaseReturns/IPurchaseReturnForm'
import IFormItem from '~/interfaces/PurchaseReturns/IPurchaseReturnFormItem'
import { create, get, getReturnItem, getPurchaseItem } from '~/repositories/purchaseReturn'

export const usePurchaseReturnStore = defineStore('purchaseReturn', {
  state: () => ({
    Form: {} as IForm,
    loading: false,
  }),
  getters: {},
  actions: {
    resetForm() {
      if (this.Form.items) {
        this.Form.items.map((item: IFormItem) => {
          item.returned_quantity = 0
        });
      }
    },
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const purchaseReturnId = nuxt.$getRouteParam('purchase_return_id')
      this.Form.purchase_id = purchaseReturnId
      if (purchaseReturnId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(purchaseReturnId))
          success = response.success
          message = response.message
          this.Form = response.data
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async getDetailItems() {
      const nuxt = useNuxtApp()

      this.loading = true

      const purchaseId = nuxt.$getRouteParam('purchase_id')
      const purchaseReturnId = nuxt.$getRouteParam('purchase_return_id')
      this.Form.purchase_id = purchaseId
      if (purchaseId) {
        let response = null as any; let success = false; let message = ''
        try {
          if (purchaseReturnId) {
            response = await getReturnItem(parseInt(purchaseReturnId))
          } else {
            response = await getPurchaseItem(parseInt(purchaseId))
          }
          success = response.success
          message = response.message
          let description = ''
          response.data.data.map((item: IFormItem) => {
            item.received_quantity_old = item.received_quantity
            item.returned_quantity_old = item.returned_quantity
            description = item.description
            return item;
          })
          this.Form.description = description
          this.Form.items = response.data.data
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
      if (this.Form.items.filter(n => n.returned_quantity > 0).length == 0) {
        nuxt.$notify(false, nuxt.$getTranslation('shared.labels.qtyEmpty'))
        return false
      }
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        response = await create(this.Form)
        success = response.success
        message = response.message
        this.resetForm()
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
  },
})