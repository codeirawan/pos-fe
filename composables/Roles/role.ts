import { defineStore } from 'pinia'
import IRole from '~/interfaces/Roles/IRole'
import IRoleForm from '~/interfaces/Roles/IRoleForm'
import { create, get, getAll, update } from '~/repositories/role'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roleForm: {} as IRoleForm,
    roles: [] as IRole[],
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
        this.roles = response.data.data
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
    async getDetail(id: number | undefined) {
      const nuxt = useNuxtApp()

      this.loading = true

      const roleId = nuxt.$getRouteParam('role_id') || id
      if (roleId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(roleId))
          success = response.success
          message = response.message
          this.roleForm = Object.assign({}, response.data)
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
        if (this.roleForm.id)
          response = await update(this.roleForm.id, this.roleForm)
        else
          response = await create(this.roleForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('/companies/roles')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      const id = parseInt(nuxt.$getRouteParam('role_id'))
      if (id)
        this.roleForm.id = id
      else
        this.roleForm.id = undefined

      this.roleForm.name = ''
    },
  },
})
