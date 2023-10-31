import { defineStore } from 'pinia'
import IPriceCategory from '~/interfaces/PriceCategories/IPriceCategory'
import IPriceCategoryForm from '~/interfaces/PriceCategories/IPriceCategoryForm'
import { create, get, update, getAll } from '~/repositories/priceCategory'

export const usePriceCategoryStore = defineStore('priceCategory', {
  state: () => ({
    priceCategories: [] as IPriceCategory[],
    priceCategoryForm: {} as IPriceCategoryForm,
    loading: false,
  }),
  actions: {
    async getAll() {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any; let success = false; let message = ''
      try {
        response = await getAll()
        success = response.success
        message = response.message
        this.priceCategories = response.data.data
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

      const priceCategoryId = nuxt.$getRouteParam('price_category_id')
      if (priceCategoryId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(priceCategoryId))
          success = response.success
          message = response.message
          this.priceCategoryForm = Object.assign({}, response.data)
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
      this.loading = true
      let response = null as any; let success = false; let message = ''
      try {
        if (this.priceCategoryForm.id)
          response = await update(this.priceCategoryForm.id!, this.priceCategoryForm.name)

        else
          response = await create(this.priceCategoryForm.name)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/price-categories')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.priceCategoryForm = Object.assign({
        id: useNuxtApp().$getRouteParam('price_category_id')
      }) as IPriceCategoryForm
    },
  },
})
