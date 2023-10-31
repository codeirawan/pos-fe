import { defineStore } from 'pinia'
import IRolePermissionForm from '~/interfaces/RolePermissions/IRolePermissionForm'
import { create } from '~/repositories/rolePermission'

export const useRolePermissionStore = defineStore('rolePermission', {
  state: () => ({
    rolePermissionForm: {} as IRolePermissionForm,
    loading: false,
  }),
  actions: {
    async submitForm(): Promise<boolean> {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = '', roleId = parseInt(nuxt.$getRouteParam('role_id'))
      try {
        response = await create(roleId, this.rolePermissionForm.permission_id!)
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`/companies/roles/${roleId}`)
      } catch (error: any) {
        console.error(error)
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
      return success
    },
    resetForm() {
      this.rolePermissionForm = { permission_id: null }
    }
  },
})