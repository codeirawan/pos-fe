import { defineStore } from 'pinia'
import IWarehouseStockTransferItem from '~/interfaces/WarehouseStockTransfers/IWarehouseStockTransferItem'
import { transferStock } from '~/repositories/warehouseStockTransfer'

export const useWarehouseStockTransferStore = defineStore('warehouseStockTransfer', {
  state: () => ({
    warehouseStockTransferItem: {} as IWarehouseStockTransferItem,
    loading: false,
  }),
  actions: {
    resetForm() {
      this.warehouseStockTransferItem.quantity = null
      this.warehouseStockTransferItem.warehouse_id = null
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        response = await transferStock(this.warehouseStockTransferItem)
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