import { defineStore } from 'pinia'
import ISupplier from '~/interfaces/Suppliers/ISupplier'
import ISupplierForm from '~/interfaces/Suppliers/ISupplierForm'
import { create, get, getAll, update } from '~/repositories/supplier'

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: [] as ISupplier[],
    supplierForm: {} as ISupplierForm,
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
        this.suppliers = response.data.data
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

      const supplierId = nuxt.$getRouteParam('supplier_id')
      if (supplierId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(supplierId))
          success = response.success
          message = response.message
          this.supplierForm = Object.assign({}, response.data)
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
        if (this.supplierForm.id)
          response = await update(this.supplierForm.id!, this.supplierForm)

        else
          response = await create(this.supplierForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/suppliers')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.supplierForm = Object.assign({
        id: useNuxtApp().$getRouteParam('supplier_id'),
      }) as ISupplierForm
    },
  },
})
