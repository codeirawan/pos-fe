import { defineStore } from 'pinia'
import IAccountType from '~/interfaces/AccountTypes/IAccountType'
import IAccountTypeForm from '~/interfaces/AccountTypes/IAccountTypeForm'
import { create, get, getAll, update } from '~/repositories/accountType'

export const useAccountTypeStore = defineStore('accountType', {
  state: () => ({
    accountTypes: [] as IAccountType[],
    accountTypeForm: {} as IAccountTypeForm,
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
        this.accountTypes = response.data.data
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

      const accountTypeId = nuxt.$getRouteParam('account_type_id')
      if (accountTypeId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(accountTypeId))
          success = response.success
          message = response.message
          this.accountTypeForm = Object.assign({}, response.data)
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
        if (this.accountTypeForm.id)
          response = await update(this.accountTypeForm.id!, this.accountTypeForm.name)

        else
          response = await create(this.accountTypeForm.name)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/account-types')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.accountTypeForm = Object.assign({
        id: useNuxtApp().$getRouteParam('account_type_id')
      }) as IAccountTypeForm
    },
  },
})
