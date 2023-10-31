import { defineStore } from 'pinia'
import IUnit from '~/interfaces/Units/IUnit'
import IUnitForm from '~/interfaces/Units/IUnitForm'
import { create, update, get, getAll, getAllWithoutSelf } from '~/repositories/unit'

export const useUnitStore = defineStore('unit', {
  state: () => ({
    units: [] as IUnit[],
    unitForm: {} as IUnitForm,
    loading: false,
  }),
  actions: {
    async getAll(itemId: string = '') {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any; let success = false; let message = ''
      try {
        if (itemId) {
          response = await getAllWithoutSelf(itemId)
        } else {
          response = await getAll()
        }
        success = response.success
        message = response.message
        this.units = response.data.data
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

      const unitId = nuxt.$getRouteParam('unit_id')
      if (unitId) {
        let response = null as any, success = false, message = ''
        try {
          response = await get(parseInt(unitId))
          success = response.success
          message = response.message
        } catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        if (this.unitForm.id) {
          response = await update(this.unitForm.id!, this.unitForm.name)
        } else {
          response = await create(this.unitForm.name)
        }
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/units`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.unitForm = Object.assign({
        id: useNuxtApp().$getRouteParam('unit_id')
      }) as IUnitForm
    }
  },
})