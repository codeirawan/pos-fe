import { defineStore } from 'pinia'
import ISubCategory from '~/interfaces/SubCategories/ISubCategory'
import ISubCategoryForm from '~/interfaces/SubCategories/ISubCategoryForm'
import { create, update, get, getAll } from '~/repositories/subCategory'

export const useSubCategoryStore = defineStore('subCategory', {
  state: () => ({
    subCategories: [] as ISubCategory[],
    subCategoryForm: {} as ISubCategoryForm,
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
        this.subCategories = response.data.data
        this.subCategories.forEach(subCategory => {
          subCategory.name = subCategory.full_name
        });
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

      const categoryId = nuxt.$getRouteParam('category_id')
      const subCategoryId = nuxt.$getRouteParam('sub_category_id')
      if (categoryId && subCategoryId) {
        let response = null as any, success = false, message = ''
        try {
          response = await get(parseInt(categoryId), parseInt(subCategoryId))
          success = response.success
          message = response.message
          this.subCategoryForm = Object.assign({}, response.data)
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
        if (this.subCategoryForm.id) {
          response = await update(this.subCategoryForm.category_id!, this.subCategoryForm.id!, this.subCategoryForm.name!)
        } else {
          response = await create(this.subCategoryForm.category_id!, this.subCategoryForm.name!)
        }
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/categories/${nuxt.$getRouteParam('category_id')}/sub-categories`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()

      this.subCategoryForm = Object.assign({
        category_id: nuxt.$getRouteParam('category_id'),
        id: nuxt.$getRouteParam('sub_category_id'),
      }) as ISubCategoryForm
    }
  },
})