import { defineStore } from 'pinia'
import IWarehouseReceiving from '~/interfaces/WarehouseReceivings/IWarehouseReceiving'
import IWarehouseReceivingForm from '~/interfaces/WarehouseReceivings/IWarehouseReceivingForm'
import IWarehouseReceivingFormItem from '~/interfaces/WarehouseReceivings/IWarehouseReceivingFormItem'
import IWarehouseReceivingItem from '~/interfaces/WarehouseReceivings/IWarehouseReceivingItem'
import IItem from '~/interfaces/Items/IItem'
import { create, get, update } from '~/repositories/warehouseReceiving'
import { getAllWithSelf } from '~/repositories/itemUnit'

// const warehouseReceivingInitialValue = {
//   id: 1,
//   supplier_name: 'SUPPLIER A',
//   warehouse_name: 'PEMASOK A',
//   items: [] as IWarehouseReceivingItem[]
// } as IWarehouseReceiving

// const warehouseReceivingFormInitialValue = {
//   warehouse_id: null,
//   supplier_id: null,
//   ImageProofs: [],
//   items: [] as IWarehouseReceivingFormItem[]
// } as IWarehouseReceivingForm

export const useAdminReceivingStore = defineStore('adminReceiving', {
  state: () => ({
    adminReceivings: [] as IWarehouseReceiving[],
    adminReceiving: Object.assign({ items: [] }) as IWarehouseReceiving,
    adminReceivingForm: Object.assign({ items: [] }) as IWarehouseReceivingForm,
    loading: false,
  }),
  actions: {
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const warehouseReceivingId = nuxt.$getRouteParam('admin_receiving_id')
      if (warehouseReceivingId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(warehouseReceivingId))
          success = response.success
          message = response.message
          this.adminReceivingForm = Object.assign({}, response.data)
          this.adminReceiving = Object.assign({}, response.data)
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async addItem(item: IItem) {
      let itemUnits = this.adminReceivingForm.items.filter(n => n.item_id == item.id)
      if (itemUnits.length == 0) {
        const response: any = await getAllWithSelf(item.store_id, item.id)
        if (response.data.data) {
          itemUnits = response.data.data
        }
      }
      let warehouseReceivingFormItem: IWarehouseReceivingFormItem = {
        item_id: item.id,
        item_name: item.name,
        item_code: item.code,
        unit_id: item.unit_id,
        unit_name: item.unit_name ?? '',
        selected_unit_name: item.unit_name ?? '',
        quantity: null,
        selected_quantity: null,
        item_units: itemUnits
      }
      if (this.adminReceivingForm.items) {
        // Check if item existed
        const findResult = this.adminReceivingForm.items.findIndex(item => item.item_id === warehouseReceivingFormItem.item_id)
        if (findResult === -1) {
          // If item does not exist add to the beginning of array
          this.adminReceivingForm.items.unshift(warehouseReceivingFormItem)
        } else {
          // Skip if existed
        }
      } else {
        this.adminReceivingForm.items = []
        this.adminReceivingForm.items.unshift(warehouseReceivingFormItem)
      }
    },
    removeItem(warehouseReceivingFormItem: IWarehouseReceivingFormItem) {
      this.adminReceivingForm.items = this.adminReceivingForm.items.filter(item => item.item_id !== warehouseReceivingFormItem.item_id)
    },
    resetForm() {
      this.adminReceivingForm = Object.assign({})
      this.adminReceivingForm.items = []
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        let warehouseReceivingId = null
        if (this.adminReceivingForm.id) {
          warehouseReceivingId = this.adminReceivingForm.id
          response = await update(this.adminReceivingForm.id, this.adminReceivingForm)
        } else {
          response = await create(this.adminReceivingForm)
          warehouseReceivingId = response.data.id
        }
        success = response.success
        message = response.message
        await nuxt.$navigate(`stores/{storeId}/warehouse-receivings/${warehouseReceivingId}`)
        this.resetForm()
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
  },
  getters: {},
})