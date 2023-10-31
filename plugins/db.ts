import type { Table } from 'dexie'
import Dexie from 'dexie'
import type ItemStock from 'interfaces/Items/ItemStock'
import type IItemSellPriceIndexdb from '~/interfaces/ItemSellPrices/IItemSellPriceIndexdb'
import type IItemBasePriceIndexdb from '~/interfaces/ItemBasePrices/IItemBasePriceIndexdb'
import type Items from '~/interfaces/Items/ItemIndexdb'

const databaseName = 'myDatabase'
export class DB extends Dexie {
  items!: Table<Items>
  basePrices!: Table<IItemBasePriceIndexdb>
  sellPrices!: Table<IItemSellPriceIndexdb>
  stocks!: Table<ItemStock>

  constructor() {
    super(databaseName)
    this.version(1).stores({
      items: 'id, store_id, sub_category_id, unit_id, code, name, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, unit_name, sub_category_name, category_name',
      basePrices: 'id, item_id, purchase_price, cost, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by',
      sellPrices: 'id, item_base_price_id, puprice_category_idrchase_price, profit, sell_price, default_price, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, store_id, item_id, item_name, item_code, unit_name, price_category_name, purchase_price, cost',
      stocks: 'id, item_stock_id, store_id, item_id, item_name, item_code, warehouse_id, warehouse_name, item_base_price_id, purchase_price, cost, stock',
    })
  }
}
export default defineNuxtPlugin((nuxtApp) => {
  const db = new DB()

  nuxtApp.provide('dexie', db)
  nuxtApp.provide('getLastDBindex', (tblName: string, key: string, id: number) => {
    return new Promise((resolve) => {
      db.table(tblName).where(key).equals(id).last().then((res) => {
        if (res && res.updated_at)
          resolve(useFormatDate(res.updated_at))

        else
          resolve(null)
      }).catch(() => {
        resolve(null)
      })
    })
  })
  nuxtApp.provide('clearDB', async () => {
    db.delete().then(() => {
      db.open()
    })
  })
})
