import { defineStore } from 'pinia'

import IItemFormWizard from '~/interfaces/Items/IItemFormWizard'
import IPriceCategory from '~/interfaces/PriceCategories/IPriceCategory'
import IWarehouse from '~/interfaces/Warehouses/IWarehouse'
import { create } from '~/repositories/itemWizard'

export const useItemWizardStore = defineStore('itemWizard', {
  state: () => ({
    itemFormWizard: {
      base_prices: [{
          sell_prices: [{
              default_price: undefined,
              default_price_temp: undefined,
              price_category_id: undefined,
              profit: undefined,
              sell_price: undefined
          }]
      }],
      units: [{
        unit_id: undefined,
        quantity: undefined
      }]
    } as IItemFormWizard,
    priceCategories: [] as IPriceCategory[],
    warehouses: [] as IWarehouse[],
    itemUnit: [{
      unit_id: null
    }],
    loading: false,
  }),
  actions: {
    setInitialState() {
      this.itemFormWizard.base_prices.splice(0, 1)
      this.addBasePrice()
    },
    resetForm() {
      this.itemFormWizard = Object.assign({
        base_prices: [this.basePrice()]
      } as IItemFormWizard)
    },
    async submitForm() {
      const nuxt = useNuxtApp()
      this.loading = true
      let response = null as any
      let success = false
      let message = ''
      if (this.itemUnit.length == 0 || this.itemUnit[0].unit_id == null) {
        nuxt.$notify(success, 'Satuan harus diisi')
      }
      try {
        this.itemFormWizard.unit_id = this.itemUnit[0].unit_id
        response = await create(this.itemFormWizard)

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
    addUnit() {
      this.itemFormWizard.units?.push({
        unit_id: undefined,
        quantity: undefined
      })
    },
    removeUnit(unitIndex: number) {
      this.itemFormWizard.units.splice(unitIndex, 1)
    },
    addBasePrice() {
      this.itemFormWizard.base_prices?.push(this.basePrice())
    },
    basePrice() {
      let basePrice = {
        purchase_price: undefined,
        cost: undefined,
        sell_prices: [] as any,
        stocks: [] as any
      }
      this.priceCategories.map((obj: any, index: number) => {
        basePrice.sell_prices?.push({
          default_price: undefined,
          default_price_temp: undefined,
          price_category_name: obj.name,
          price_category_id: obj.id,
          profit: undefined,
          sell_price: undefined
        })
      })

      this.warehouses.map((obj: any, index: number) => {
        basePrice.stocks?.push({
          warehouse_id: obj.id,
          warehouse_name: obj.name,
          stock: undefined,
        })
      })

      return basePrice
    },
    removeBasePrice(basePriceIndex: number) {
      this.itemFormWizard.base_prices.splice(basePriceIndex, 1)
    },
    calculateDefaultPrice(basePriceIndex: number) {
      const basePrice = this.itemFormWizard.base_prices[basePriceIndex]
      basePrice.sell_prices.map((sellPrice: any) => {
        sellPrice.default_price = (parseFloat(basePrice.purchase_price?.toString() || '0') ?? 0) + (parseFloat(basePrice.cost?.toString() || '0') ?? 0)
        sellPrice.default_price_temp = sellPrice.default_price
      })
    },
    calculateSellPrice(basePriceIndex: number, sellPriceIndex: number, type: string = '') {
      const basePrice = this.itemFormWizard.base_prices[basePriceIndex]
      const sellPrice = this.itemFormWizard.base_prices[basePriceIndex].sell_prices[sellPriceIndex]
      if (basePrice) {
        if (sellPrice) {
          if (type != 'profit') {
            sellPrice.profit = (parseFloat(sellPrice.sell_price?.toString() || '0') ?? 0) - (parseFloat(sellPrice.default_price?.toString() || '0') ?? 0)
          }
          if (type != 'sell_price') {
            sellPrice.sell_price = (parseFloat(sellPrice.default_price?.toString() || '0') ?? 0) + (parseFloat(sellPrice.profit?.toString() || '0') ?? 0)
          }
        }
      }
    }
  },
})
