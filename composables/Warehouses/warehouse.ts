import { defineStore } from 'pinia'
import IWarehouse from '~/interfaces/Warehouses/IWarehouse'
import IWarehouseForm from '~/interfaces/Warehouses/IWarehouseForm'
import { create, get, update, getAll } from '~/repositories/warehouse'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouses: [] as IWarehouse[],
    warehouseForm: {} as IWarehouseForm,
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
        this.warehouses = response.data.data
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

      const warehouseId = nuxt.$getRouteParam('warehouse_id')
      if (warehouseId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(warehouseId))
          success = response.success
          message = response.message
          this.warehouseForm = Object.assign({}, response.data)
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
        if (this.warehouseForm.id)
          response = await update(this.warehouseForm)

        else
          response = await create(this.warehouseForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('/companies/warehouses')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      const id = parseInt(nuxt.$getRouteParam('warehouse_id'))
      if (id)
        this.warehouseForm.id = id

      else
        this.warehouseForm.id = undefined

      this.warehouseForm.name = ''
    },
  },
})
