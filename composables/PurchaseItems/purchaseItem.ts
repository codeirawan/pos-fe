import { defineStore } from 'pinia'
import IReceivePurchaseItemForm from '~/interfaces/PurchaseItems/IReceivePurchaseItemForm'
import { create } from '~/repositories/purchaseItem'

export const usePurchaseItemStore = defineStore('purchaseItem', {
  state: () => ({
    purchaseItemForm: {} as IReceivePurchaseItemForm,
    loading: false,
  }),
  actions: {
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any; let success = false; let message = ''
      try {
        const purchaseId = nuxt.$getRouteParam('purchase_id')
        response = await create(purchaseId, this.purchaseItemForm.purchase_item_id, this.purchaseItemForm)
        success = response.success
        message = response.message
        this.resetForm()
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
      return success
    },
    resetForm() {
      this.purchaseItemForm.received_quantity = null
      this.purchaseItemForm.warehouse_id = 0
    },
  },
})
