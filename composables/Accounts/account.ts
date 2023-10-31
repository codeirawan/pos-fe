import { defineStore } from 'pinia'
import IAccount from '~/interfaces/Accounts/IAccount'
import IAccountForm from '~/interfaces/Accounts/IAccountForm'
import { create, get, getAll, update } from '~/repositories/account'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountForm: {} as IAccountForm,
    accounts: [] as IAccount[],
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
        this.accounts = response.data.data
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

      const accountId = nuxt.$getRouteParam('account_id')
      if (accountId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(accountId))
          success = response.success
          message = response.message
          this.accountForm = Object.assign({}, response.data)
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
        if (this.accountForm.id)
          response = await update(this.accountForm.id, this.accountForm)

        else
          response = await create(this.accountForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/accounts')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      const id = parseInt(nuxt.$getRouteParam('account_id'))
      if (id)
        this.accountForm.id = id

      else
        this.accountForm.id = undefined

      this.accountForm.name = ''
      this.accountForm.number = null
      this.accountForm.account_type_id = undefined
    },
  },
})
