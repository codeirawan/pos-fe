import { defineStore } from 'pinia'
import IItemUnit from '~/interfaces/ItemUnits/IItemUnit'
import IItemUnitForm from '~/interfaces/ItemUnits/IItemUnitForm'
import { create, update, get, getAll, getAllWithSelf } from '~/repositories/itemUnit'

export const useItemUnitStore = defineStore('itemUnit', {
  state: () => ({
    itemUnit: {} as IItemUnit,
    itemUnits: [] as IItemUnit[],
    itemUnitForm: {} as IItemUnitForm,
    loading: false,
  }),
  actions: {
    async getAll(itemId: number, self: boolean = true) {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any; let success = false; let message = ''
      try {
        if (self) {
          response = await getAllWithSelf(itemId)
        } else {
          response = await getAll(itemId)
        }
        success = response.success
        message = response.message
        if (response.data.data) {
          response.data.data.forEach((data: IItemUnit) => {
            this.itemUnits.push(data)
          });
        }
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

      const itemUnitId = nuxt.$getRouteParam('unit_id')
      const itemId = nuxt.$getRouteParam('item_id')
      if (itemUnitId) {
        let response = null as any, success = false, message = ''
        try {
          response = await get(parseInt(itemId), parseInt(itemUnitId))
          success = response.success
          message = response.message
          this.itemUnitForm = Object.assign({}, response.data)
          this.itemUnit = Object.assign({}, response.data)
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
      const itemUnitId = nuxt.$getRouteParam('unit_id')
      const itemId = nuxt.$getRouteParam('item_id')
      try {
        if (this.itemUnitForm.id) {
          response = await update(itemId, itemUnitId, this.itemUnitForm)
        } else {
          response = await create(itemId, this.itemUnitForm)
        }
        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate(`stores/{storeId}/items/${itemId}`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      const nuxt = useNuxtApp()
      const itemUnitId = parseInt(nuxt.$getRouteParam('unit_id'))
      if (itemUnitId) {
        this.itemUnitForm.id = itemUnitId
      } else {
        this.itemUnitForm.id = undefined
      }

      this.itemUnitForm.quantity = 0
      this.itemUnitForm.unit_id = 0
    }
  },
})