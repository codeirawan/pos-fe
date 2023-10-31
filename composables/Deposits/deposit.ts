import { defineStore } from 'pinia'
import IDepositForm from '~/interfaces/Deposits/IDepositForm'
import IDepositEntry from '~/interfaces/Deposits/IDepositEntry'
import { create, get, update } from '~/repositories/deposit'

export const useDepositStore = defineStore('deposit', {
  state: () => ({
    depositForm: {
      entries: [
        {} as IDepositEntry
      ]
    } as IDepositForm,
    loading: false,
  }),
  getters: {
    getTotalAmount(): number {
      let totalAmount = 0 as number
      if (this.depositForm.entries) {
        this.depositForm.entries.forEach(item => {
          totalAmount += parseFloat(item.amount?.toString()) ?? 0
        })
      }
      return totalAmount ?? 0
    },
  },
  actions: {
    async addItem() {
      if (!this.depositForm.entries) {
        this.depositForm.entries = []
      }
      this.depositForm.entries.push({} as IDepositEntry)
    },
    removeItem(index: number) {
      this.depositForm.entries.splice(index, 1)
    },
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const depositId = nuxt.$getRouteParam('deposit_id')
      if (depositId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(depositId))
          success = response.success
          message = response.message
          this.depositForm = Object.assign({}, response.data)
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
        this.depositForm.amount = this.getTotalAmount
        if (this.depositForm.id)
          response = await update(this.depositForm)

        else
          response = await create(this.depositForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/deposits')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      this.depositForm = Object.assign({}, <IDepositForm>{
        id: nuxt.$getRouteParam('deposit_id'),
        entries: [
          {} as IDepositEntry
        ]
      })
    },
  },
})
