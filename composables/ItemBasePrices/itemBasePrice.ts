import { defineStore } from 'pinia'
import IItemBasePrice from '~/interfaces/ItemBasePrices/IItemBasePrice'
import IItemBasePriceForm from '~/interfaces/ItemBasePrices/IItemBasePriceForm'
import { create, update, get, getAll } from '~/repositories/itemBasePrice'

export const useItemBasePriceStore = defineStore('itemBasePrice', {
  state: () => ({
    itemBasePrice: {} as IItemBasePrice,
    itemBasePrices: [] as IItemBasePrice[],
    itemBasePriceForm: {} as IItemBasePriceForm,
    loading: false,
  }),
  actions: {
    async getAll(itemId: number) {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any; let success = false; let message = ''
      try {
        response = await getAll(itemId)
        success = response.success
        message = response.message
        if (response.data.data) {
          response.data.data.forEach((data: IItemBasePrice) => {
            this.itemBasePrices.push(data)
          });
        }
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const itemBasePriceId = nuxt.$getRouteParam('base_price_id')
      const itemId = nuxt.$getRouteParam('item_id')
      if (itemBasePriceId) {
        let response = null as any, success = false, message = ''
        try {
          response = await get(parseInt(itemId), parseInt(itemBasePriceId))
          success = response.success
          message = response.message
          this.itemBasePriceForm = Object.assign({}, response.data)
          this.itemBasePrice = Object.assign({}, response.data)
        } catch (error: any) {
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
      const itemBasePriceId = nuxt.$getRouteParam('base_price_id')
      const itemId = nuxt.$getRouteParam('item_id')
      try {
        if (this.itemBasePriceForm.id) {
          response = await update(itemId, itemBasePriceId, this.itemBasePriceForm)
        } else {
          response = await create(itemId, this.itemBasePriceForm)
        }
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/items/${itemId}`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.itemBasePriceForm = Object.assign({
        id: useNuxtApp().$getRouteParam('base_price_id')
      }) as IItemBasePriceForm
    }
  },
})