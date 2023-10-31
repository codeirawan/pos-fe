import { defineStore } from 'pinia'
import IUser from '~/interfaces/Users/IUser'
import IUserForm from '~/interfaces/Users/IUserForm'
import { create, get, getAll, update } from '~/repositories/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as IUser[],
    userForm: {} as IUserForm,
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
        this.users = response.data.data
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

      const userId = nuxt.$getRouteParam('user_id') || id
      if (userId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(userId))
          success = response.success
          message = response.message
          this.userForm = Object.assign({}, response.data)
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
      if (this.userForm.password !== this.userForm.repeat_password && this.userForm.password !== undefined) {
        nuxt.$notify(false, nuxt.$getTranslation('shared.notifications.repeatPasswordShouldBeSame'))
        return
      }

      this.loading = true
      let response = null as any; let success = false; let message = ''
      try {
        if (this.userForm.id)
          response = await update(this.userForm.id!, this.userForm)
        else
          response = await create(this.userForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('/companies/users')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.userForm = Object.assign({}, <IUserForm>{
        id: useNuxtApp().$getRouteParam('user_id')
      })
    },
  },
})
