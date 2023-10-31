import { defineStore } from 'pinia'
import IUserStoreForm from '~/interfaces/UserStores/IUserStoreForm'
import { create } from '~/repositories/userStore'

export const useUserStoreStore = defineStore('userStore', {
  state: () => ({
    userStoreForm: {} as IUserStoreForm,
    loading: false,
  }),
  actions: {
    async submitForm(): Promise<boolean> {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = '', userId = parseInt(nuxt.$getRouteParam('user_id'))
      try {
        response = await create(userId, this.userStoreForm.store_id!)
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`/companies/users/${userId}`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
      return success
    },
    resetForm() {
      this.userStoreForm = { store_id: null }
    }
  },
})