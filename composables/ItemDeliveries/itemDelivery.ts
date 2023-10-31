import { defineStore } from 'pinia'
import ISale from '~/interfaces/Sales/ISale'
import ISaleForm from '~/interfaces/Sales/ISaleForm'
import { submitDeliveryItem, get, getSaleitems } from '~/repositories/itemDelivery'
const { data } = useAuth()

export const useItemDeliveryStore = defineStore('itemDelivery', {
  state: () => ({
    sale: Object.assign({ items: [] }) as ISale,
    saleForm: Object.assign({ items: [] }) as ISaleForm,
    loading: false,
  }),
  getters: {},
  actions: {
    resetForm() {
      this.saleForm = Object.assign({ items: [] }) as ISaleForm
    },
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const itemDeliveryId = nuxt.$getRouteParam('item_delivery_id')
      if (itemDeliveryId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(itemDeliveryId))
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
    async getSaleitems() {
      const nuxt = useNuxtApp()

      this.loading = true

      const itemDeliveryId = nuxt.$getRouteParam('item_delivery_id')
      if (itemDeliveryId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await getSaleitems(parseInt(itemDeliveryId))
          success = response.success
          message = response.message
          response.data.data.map((item: any) => {
            item.returned_quantity = null
          })
          this.saleForm.items = response.data.data
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async submitDeliveryItem() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        const itemDeliveryId = nuxt.$getRouteParam('item_delivery_id')
        response = await submitDeliveryItem(itemDeliveryId, this.saleForm.items)
        success = response.success
        message = response.message
        this.getDetail()
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
      return success
    },
  },
})