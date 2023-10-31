import { defineStore } from 'pinia'
import ISendSaleItemForm from '~/interfaces/SaleItems/ISendSaleItemForm'
import { create } from '~/repositories/saleItem'

export const useSaleItemStore = defineStore('saleItem', {
  state: () => ({
    sendSaleItemForm: {} as ISendSaleItemForm,
    loading: false,
  }),
  actions: {
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any; let success = false; let message = ''
      try {
        const saleId = nuxt.$getRouteParam('sale_id')
        response = await create(saleId, this.sendSaleItemForm.sale_item_id, this.sendSaleItemForm)
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
      this.sendSaleItemForm.sent_quantity = null
    },
  },
})
