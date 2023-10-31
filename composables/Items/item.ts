import { defineStore } from 'pinia'

import IItem from '~/interfaces/Items/IItem'
import IItemForm from '~/interfaces/Items/IItemForm'
import { create, update, get, getAll, getAllBySupplierId } from '~/repositories/item'

export const useItemStore = defineStore('item', {
  state: () => ({
    item: {} as IItem,
    items: [] as IItem[],
    items2: [] as IItem[],
    itemForm: {} as IItemForm,
    loading: false,
  }),
  actions: {
    async getAllBySupplierId(supplierId: number) {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any
      let success = false
      let message = ''
      try {
        response = await getAllBySupplierId(supplierId)
        success = response.success
        message = response.message
        this.items = response.data.data
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
    async getAll() {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any
      let success = false
      let message = ''
      try {
        response = await getAll()
        success = response.success
        message = response.message
        response.data.data.map((obj: any) => {
          obj.delete = false
          return obj;
        })
        this.items = response.data.data
        this.items2 = response.data.data
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

      const itemId = nuxt.$getRouteParam('item_id')
      if (itemId) {
        let response = null as any
        let success = false
        let message = ''
        try {
          response = await get(parseInt(itemId))
          success = response.success
          message = response.message
          this.itemForm = Object.assign({}, response.data)
          this.item = Object.assign({}, response.data)
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async getDetailIndexdb() {
      this.loading = true
      const nuxt = useNuxtApp()
      const itemId = nuxt.$getRouteParam('item_id')
      if (itemId) {
        try {
          const db = nuxt.$dexie
          const item = await db.items.where('id').equals(parseInt(itemId)).first()
          this.item = Object.assign({}, item)
          this.itemForm = Object.assign({}, item)
        }
        catch (error: any) {
        }
      }

      this.loading = false
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any
      let success = false
      let message = ''
      try {
        if (this.itemForm.id)
          response = await update(this.itemForm)

        else
          response = await create(this.itemForm)

        success = response.success
        message = response.message
        this.resetForm()
        nuxt.$navigate('stores/{storeId}/items')
      }
      catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.itemForm = Object.assign({
        id: useNuxtApp().$getRouteParam('item_id')
      }) as IItemForm
    },
    filterItem(supplierId: number) {
      this.items = this.items2.filter(item => item.supplier_id == supplierId)
    },
    addItem(itemId: number) {
      // NEED TO BE REWORKED: @Rully
      // const items2Index = this.items2.findIndex((obj => obj.id == itemId))
      // if (items2Index >= 0) {
      //   this.items2[items2Index].delete = false
      // }
      // this.items = this.items.filter(item => item.delete == false)
    },
    removeItem(itemParam: IItem) {
      // NEED TO BE REWORKED: @Rully
      // const items2Index = this.items2.findIndex((obj => obj.id == itemParam.id))
      // if (items2Index >= 0) {
      //   this.items2[items2Index].delete = true
      // }
      // this.items = this.items.filter(item => item.delete == false)
    },
  },
})
