import { defineStore } from 'pinia'
import IPermission from '~/interfaces/Permissions/IPermission'
import IPermissionForm from '~/interfaces/Permissions/IPermissionForm'
import { create, get, getAll, update } from '~/repositories/permission'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissionForm: {} as IPermissionForm,
    permissions: [] as IPermission[],
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
        this.permissions = response.data.data
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

      const permissionId = nuxt.$getRouteParam('permission_id')
      if (permissionId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(permissionId))
          success = response.success
          message = response.message
          this.permissionForm = Object.assign({}, response.data)
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
        if (this.permissionForm.id)
          response = await update(this.permissionForm.id, this.permissionForm)
        else
          response = await create(this.permissionForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/permissions')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      const id = parseInt(nuxt.$getRouteParam('permission_id'))
      if (id)
        this.permissionForm.id = id
      else
        this.permissionForm.id = undefined

      this.permissionForm.name = ''
    },
  },
})
