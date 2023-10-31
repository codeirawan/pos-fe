import IItemBasePriceForm from "interfaces/ItemBasePrices/IItemBasePriceForm"

export const create = async (itemId: number, data: IItemBasePriceForm) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `items/${itemId}/item-units`,
    body: data
  })
}

export const get = async (itemId: number, id: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/item-units/${id}`,
  })
}

export const getAll = async (itemId: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/units`,
  })
}

export const getAllWithSelf = async (storeId: number | undefined, itemId: number) => {
  let url = `items/${itemId}/item-units/with-self`
  if (storeId) {
    url = `${storeId}/${url}`
  }
  return useNuxtApp().$fetcher({
    url
  })
}

export const update = async (itemId: number, id: number, data: IItemBasePriceForm) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `items/${itemId}/item-units/${id}`,
    body: data
  })
}