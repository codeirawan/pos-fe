import { defineStore } from 'pinia'
import IForm from '~/interfaces/SaleReturns/ISaleReturnForm'
import IFormItem from '~/interfaces/SaleReturns/ISaleReturnFormItem'
import { create, get, getReturnItem, getSaleItem } from '~/repositories/saleReturn'

export const useSaleReturnStore = defineStore('saleReturn', {
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

      const saleReturnId = nuxt.$getRouteParam('sale_return_id')
      this.Form.sale_id = saleReturnId
      if (saleReturnId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(saleReturnId))
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
      this.resetForm()
      const nuxt = useNuxtApp()

      this.loading = true

      const saleId = nuxt.$getRouteParam('sale_id')
      const saleReturnId = nuxt.$getRouteParam('sale_return_id')
      this.Form.sale_id = saleId
      if (saleId) {
        let response = null as any; let success = false; let message = ''
        try {
          if (saleReturnId) {
            response = await getReturnItem(parseInt(saleReturnId))
          } else {
            response = await getSaleItem(parseInt(saleId))
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
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
  },
})