import { defineStore } from 'pinia'
import IStore from '~/interfaces/Stores/IStore'
import IStoreForm from '~/interfaces/Stores/IStoreForm'
import { create, get, getAll, update } from '~/repositories/store'

export const useStoreStore = defineStore('store', {
  state: () => ({
    storeForm: { sale_lower_price_permission: 0 } as IStoreForm,
    stores: [] as IStore[],
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
        this.stores = response.data.data
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

      const storeId = nuxt.$getRouteParam('store_id')
      if (storeId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(storeId))
          success = response.success
          message = response.message
          this.storeForm = Object.assign({}, response.data)
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
        if (this.storeForm.id)
          response = await update(this.storeForm.id, this.storeForm)
        else
          response = await create(this.storeForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('/companies/stores')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.storeForm = Object.assign({}, <IStoreForm>{
        id: useNuxtApp().$getRouteParam('store_id')
      })
      this.storeForm.sale_lower_price_permission = 0
    },
  },
})
