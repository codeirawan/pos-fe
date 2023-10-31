import { defineStore } from 'pinia'
import { notify } from '~/repositories/itemStock'

export const useItemStockStore = defineStore('itemStock', {
  state: () => ({
    loading: false,
  }),
  actions: {
    async notify() {
      const nuxt = useNuxtApp()

      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        response = await notify()
        success = response.success
        message = response.message
      } catch (error: any) {
        console.log(error)
        message = error.data?.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    }
  },
})