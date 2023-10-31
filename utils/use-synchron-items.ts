import type { IAPIResponse } from 'interfaces/IAPI'

export default function (storeId: number, withStoreId = true) {
  return new Promise((resolve, reject) => {
    let url = 'items'
    if (withStoreId === false)
      url = `${storeId}/items`

    const { $dexie, $getLastDBindex, $fetcher } = useNuxtApp()
    $getLastDBindex('items', 'store_id', storeId).then((last: string) => {
      if (last)
        url += `?last_date=${last}`
      $fetcher({ url, withStoreId }).then((res: IAPIResponse) => {
        const { success, data } = res
        if (success) {
          $dexie.items.bulkPut(data.data).then((last_key: any) => {
            resolve({ success, last_key })
          }).catch((e: any) => {
            reject(e)
          })
        }
        else {
          reject(new Error(`${JSON.stringify(res)}`))
        }
      })
    })
  })
}
