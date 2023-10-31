import { defineStore } from 'pinia'
import IItemSellPrice from '~/interfaces/ItemSellPrices/IItemSellPrice'
import IItemSellPriceForm from '~/interfaces/ItemSellPrices/IItemSellPriceForm'
import { create, update, get } from '~/repositories/itemSellPrice'

export const useItemSellPriceStore = defineStore('itemSellPrice', {
  state: () => ({
    itemSellPrice: {} as IItemSellPrice,
    itemSellPrices: [] as IItemSellPrice[],
    itemSellPriceForm: {} as IItemSellPriceForm,
    loading: false,
  }),
  actions: {
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const itemId = nuxt.$getRouteParam('item_id')
      const basePriceId = nuxt.$getRouteParam('base_price_id')
      const sellPriceId = nuxt.$getRouteParam('sell_price_id')
      if (basePriceId && sellPriceId) {
        let response = null as any, success = false, message = ''
        try {
          response = await get(parseInt(itemId), parseInt(basePriceId), parseInt(sellPriceId))
          success = response.success
          message = response.message
          this.itemSellPriceForm = Object.assign({}, response.data)
          this.itemSellPrice = Object.assign({}, response.data)
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
      const itemId = nuxt.$getRouteParam('item_id')
      const basePriceId = nuxt.$getRouteParam('base_price_id')
      const sellPriceId = nuxt.$getRouteParam('sell_price_id')
      try {
        if (this.itemSellPriceForm.id) {
          response = await update(itemId, basePriceId, sellPriceId, this.itemSellPriceForm)
        } else {
          response = await create(itemId, basePriceId, this.itemSellPriceForm)
        }
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/items/${itemId}/base-prices/${basePriceId}`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.itemSellPriceForm = Object.assign({
        id: useNuxtApp().$getRouteParam('sell_price_id')
      }) as IItemSellPriceForm
    }
  },
})