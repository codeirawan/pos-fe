import { defineStore } from 'pinia'
import ICategory from '~/interfaces/Categories/ICategory'
import ICategoryForm from '~/interfaces/Categories/ICategoryForm'
import { create, update, get } from '~/repositories/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[],
    categoryForm: {} as ICategoryForm,
    loading: false,
  }),
  actions: {
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const categoryId = nuxt.$getRouteParam('category_id')
      if (categoryId) {
        let response = null as any, success = false, message = ''
        try {
          response = await get(parseInt(categoryId))
          success = response.success
          message = response.message
          this.categoryForm = Object.assign({}, response.data)
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
      try {
        if (this.categoryForm.id) {
          response = await update(this.categoryForm.id!, this.categoryForm.name!)
        } else {
          response = await create(this.categoryForm.name!)
        }
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/categories`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.categoryForm = Object.assign({
        id: useNuxtApp().$getRouteParam('category_id'),
      }) as ICategoryForm
    }
  },
})