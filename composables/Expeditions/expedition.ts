import { defineStore } from 'pinia'
import type IExpedition from '~/interfaces/Expeditions/IExpedition'
import type IExpeditionForm from '~/interfaces/Expeditions/IExpeditionForm'
import { create, get, getAll, update } from '~/repositories/expedition'

export const useExpeditionStore = defineStore('expedition', {
  state: () => ({
    expeditions: [] as IExpedition[],
    expeditionForm: {} as IExpeditionForm,
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
        this.expeditions = response.data.data
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

      const expeditionId = nuxt.$getRouteParam('expedition_id')
      if (expeditionId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(expeditionId))
          success = response.success
          message = response.message
          this.expeditionForm = Object.assign({}, response.data)
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
        if (this.expeditionForm.id)
          response = await update(this.expeditionForm.id!, this.expeditionForm.name)

        else
          response = await create(this.expeditionForm.name)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/expeditions')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.expeditionForm = Object.assign({
        id: useNuxtApp().$getRouteParam('expedition_id')
      }) as IExpeditionForm
    },
  },
})
