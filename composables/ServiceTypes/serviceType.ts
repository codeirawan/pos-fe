import { defineStore } from 'pinia'
import IServiceType from '~/interfaces/ServiceTypes/IServiceType'
import IServiceTypeForm from '~/interfaces/ServiceTypes/IServiceTypeForm'
import { create, get, getAll, update } from '~/repositories/serviceType'

export const useServiceTypeStore = defineStore('serviceType', {
  state: () => ({
    serviceTypes: [] as IServiceType[],
    serviceTypeForm: {} as IServiceTypeForm,
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
        this.serviceTypes = response.data.data
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

      const serviceTypeId = nuxt.$getRouteParam('service_type_id')
      if (serviceTypeId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(serviceTypeId))
          success = response.success
          message = response.message
          this.serviceTypeForm = Object.assign({}, response.data)
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
        if (this.serviceTypeForm.id)
          response = await update(this.serviceTypeForm.id!, this.serviceTypeForm.name!)

        else
          response = await create(this.serviceTypeForm.name!)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/service-types')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.serviceTypeForm = Object.assign({
        id: useNuxtApp().$getRouteParam('service_type_id')
      }) as IServiceTypeForm
    },
  },
})
