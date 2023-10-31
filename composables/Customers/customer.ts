import { defineStore } from 'pinia'
import ICustomer from '~/interfaces/Customers/ICustomer'
import ICustomerForm from '~/interfaces/Customers/ICustomerForm'
import { create, get, getAll, update } from '~/repositories/customer'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [] as ICustomer[],
    customerForm: {} as ICustomerForm,
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
        this.customers = response.data.data
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

      const customerId = nuxt.$getRouteParam('customer_id')
      if (customerId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(customerId))
          success = response.success
          message = response.message
          this.customerForm = Object.assign({}, response.data)
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
        if (this.customerForm.id)
          response = await update(this.customerForm.id!, this.customerForm)
        else
          response = await create(this.customerForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/customers')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.customerForm = Object.assign({
        id: useNuxtApp().$getRouteParam('customer_id')
      }) as ICustomerForm
    },
  },
})
