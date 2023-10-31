import { defineStore } from 'pinia'
import IUserRoleForm from '~/interfaces/UserRoles/IUserRoleForm'
import { create } from '~/repositories/userRole'

export const useUserRoleStore = defineStore('userRole', {
  state: () => ({
    userRoleForm: {} as IUserRoleForm,
    loading: false,
  }),
  actions: {
    async submitForm(): Promise<boolean> {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = '', userId = parseInt(nuxt.$getRouteParam('user_id'))
      try {
        response = await create(userId, this.userRoleForm.role_id!)
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
      this.userRoleForm = { role_id: null }
    }
  },
})