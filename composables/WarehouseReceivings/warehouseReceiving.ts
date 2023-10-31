import { defineStore } from 'pinia'
import IWarehouseReceiving from '~/interfaces/WarehouseReceivings/IWarehouseReceiving'
import IWarehouseReceivingForm from '~/interfaces/WarehouseReceivings/IWarehouseReceivingForm'
import IWarehouseReceivingFormItem from '~/interfaces/WarehouseReceivings/IWarehouseReceivingFormItem'
import IWarehouseReceivingItem from '~/interfaces/WarehouseReceivings/IWarehouseReceivingItem'
import IItem from '~/interfaces/Items/IItem'
import { create, get, update } from '~/repositories/warehouseReceiving'
import { getAllWithSelf } from '~/repositories/itemUnit'

const warehouseReceivingInitialValue = {
  id: 1,
  supplier_name: 'SUPPLIER A',
  warehouse_name: 'PEMASOK A',
  items: [] as IWarehouseReceivingItem[]
} as IWarehouseReceiving

const warehouseReceivingFormInitialValue = {
  warehouse_id: null,
  supplier_id: null,
  items: [] as IWarehouseReceivingFormItem[]
} as IWarehouseReceivingForm

export const useWarehouseReceivingStore = defineStore('warehouseReceiving', {
  state: () => ({
    warehouseReceivings: [] as IWarehouseReceiving[],
    warehouseReceiving: Object.assign({}, warehouseReceivingInitialValue) as IWarehouseReceiving,
    warehouseReceivingForm: Object.assign({}, warehouseReceivingFormInitialValue) as IWarehouseReceivingForm,
    loading: false,
  }),
  actions: {
    async getDetail() {
      const nuxt = useNuxtApp()

      this.loading = true

      const warehouseReceivingId = nuxt.$getRouteParam('warehouse_receiving_id')
      if (warehouseReceivingId) {
        let response = null as any; let success = false; let message = ''
        try {
          response = await get(parseInt(warehouseReceivingId))
          success = response.success
          message = response.message
          this.warehouseReceivingForm = Object.assign({}, response.data)
          this.warehouseReceiving = Object.assign({}, response.data)
        }
        catch (error: any) {
          message = error.data.message
          nuxt.$notify(success, message)
        }
      }

      this.loading = false
    },
    async addItem(item: IItem) {
      this.loading = true
      let itemUnits = this.warehouseReceivingForm.items.filter(n => n.item_id == item.id)
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
        supplier_id: item.supplier_id,
        item_units: itemUnits
      }
      if (this.warehouseReceivingForm.items) {
        // Check if item existed
        const findResult = this.warehouseReceivingForm.items.findIndex(item => item.item_id === warehouseReceivingFormItem.item_id)
        if (findResult === -1) {
          // If item does not exist add to the beginning of array
          this.warehouseReceivingForm.items.unshift(warehouseReceivingFormItem)
        } else {
          // Skip if existed
        }
      } else {
        this.warehouseReceivingForm.items = []
        this.warehouseReceivingForm.items.unshift(warehouseReceivingFormItem)
      }
      this.loading = false
    },
    removeItem(warehouseReceivingFormItem: IWarehouseReceivingFormItem) {
      this.warehouseReceivingForm.items = this.warehouseReceivingForm.items.filter(item => item.item_id !== warehouseReceivingFormItem.item_id)
    },
    filterItem(supplier_id: number) {
      this.warehouseReceivingForm.items = this.warehouseReceivingForm.items.filter(item => item.supplier_id == supplier_id)
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any, success = false, message = ''
      try {
        let warehouseReceivingId = null
        if (this.warehouseReceivingForm.id) {
          warehouseReceivingId = this.warehouseReceivingForm.id
          response = await update(this.warehouseReceivingForm.id, this.warehouseReceivingForm)
        } else {
          response = await create(this.warehouseReceivingForm)
          warehouseReceivingId = response.data.id
        }
        success = response.success
        message = response.message
        this.resetForm()
        await nuxt.$navigate(`warehouses/{warehouseId}/warehouse-receivings/${warehouseReceivingId}`)
      } catch (error: any) {
        message = error.data.message
      }
      this.loading = false
      nuxt.$notify(success, message)
    },
    resetForm() {
      this.warehouseReceivingForm = Object.assign({}, warehouseReceivingFormInitialValue)
      this.warehouseReceivingForm.items = []
    },
  }
})