import type { IAPIResponse } from 'interfaces/IAPI'
import type IItemBasePriceIndexdb from 'interfaces/ItemBasePrices/IItemBasePriceIndexdb'
import type Items from 'interfaces/Items/ItemIndexdb'

export default async function (store_id: number) {
  const { $dexie, $getLastDBindex, $fetcher } = useNuxtApp()
  try {
    const items = await $dexie.items.where('store_id').equals(store_id).toArray() as Array<Items>
    for (const itm of items) {
      const childs = await $dexie.basePrices.where('item_id').equals(itm.id).toArray() as Array<IItemBasePriceIndexdb>
      if (childs) {
        for (const _itm of childs) {
          const last = await $getLastDBindex('sellPrices', 'item_id', itm.id)
          let url = `items/${itm.id}/base-prices/${_itm.id}/sell-prices`
          if (last)
            url += `?last_date=${last}`

          const _c = await $fetcher({ url }) as IAPIResponse
          const { success, data } = _c
          if (success) {
            for (const _it of data.data) {
              await $dexie.sellPrices.put(_it)
              const _d = await $fetcher({ url: `items/${itm.id}/base-prices/${_itm.id}/stocks` }) as IAPIResponse
              const { success: _success, data: _data } = _d
              if (_success)
                await $dexie.stocks.bulkPut(_data.data)
            }
          }
        }
      }
    }
    return true
  }
  catch (e) {
    return false
  }
}
