import { defineStore } from 'pinia'
import IExpenseForm from '~/interfaces/Expenses/IExpenseForm'
import IExpenseEntry from '~/interfaces/Expenses/IExpenseEntry'
import { create, get, update } from '~/repositories/expense'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenseForm: {
      entries: [
        {} as IExpenseEntry
      ]
    } as IExpenseForm,
    loading: false,
  }),
  getters: {
    getTotalAmount(): number {
      let totalAmount = 0 as number
      if (this.expenseForm.entries) {
        this.expenseForm.entries.forEach(item => {
          totalAmount += parseFloat(item.amount?.toString()) ?? 0
        })
      }
      return totalAmount ?? 0
    },
  },
  actions: {
    async addItem() {
      if (!this.expenseForm.entries) {
        this.expenseForm.entries = []
      }
      this.expenseForm.entries.push({} as IExpenseEntry)
    },
    removeItem(index: number) {
      this.expenseForm.entries.splice(index, 1)
    },
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const expenseId = nuxt.$getRouteParam('expense_id')
      if (expenseId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(expenseId))
          success = response.success
          message = response.message
          this.expenseForm = Object.assign({}, response.data)
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
        this.expenseForm.amount = this.getTotalAmount
        if (this.expenseForm.id)
          response = await update(this.expenseForm)

        else
          response = await create(this.expenseForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/expenses')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      this.expenseForm = Object.assign({}, <IExpenseForm>{
        id: nuxt.$getRouteParam('expense_id'),
        entries: [
          {} as IExpenseEntry
        ]
      })
    },
  },
})
