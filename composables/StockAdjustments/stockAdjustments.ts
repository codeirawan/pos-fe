import { defineStore } from 'pinia'
import IStockAdjustmentItem from 'interfaces/StockAdjustments/IStockAdjustmentItem'
import { adjustment } from '~/repositories/stockAdjustment'

export const useStockAdjustmentStore = defineStore('stockAdjustment', {
  state: () => ({
    stockAdjustmentItem: {} as IStockAdjustmentItem,
    loading: false,
  }),
  actions: {
    resetForm() {
      this.stockAdjustmentItem.stock_after = null
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        response = await adjustment(this.stockAdjustmentItem)
        success = response.success
        message = response.message
        this.resetForm()
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
      return success
    },
  },
  getters: {},
})