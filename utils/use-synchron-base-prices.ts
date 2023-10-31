import type { IAPIResponse } from 'interfaces/IAPI'

export default async function (store_id: number) {
  const { $dexie, $getLastDBindex, $fetcher } = useNuxtApp()
  const items = await $dexie.items.where('store_id').equals(store_id).toArray()
  if (items) {
    for (const item of items) {
      let url = `items/${item.id}/base-prices`
      const last = await $getLastDBindex('basePrices', 'item_id', item.id)
      if (last)
        url += `?last_date=${last}`

      try {
        const _c = await $fetcher({ url }) as IAPIResponse
        const { success, data } = _c
        if (success)
          await $dexie.basePrices.bulkPut(data.data)
      }
      catch (e) {
      }
    }
  }
  return true
}
