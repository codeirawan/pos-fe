import IItemBasePriceForm from "interfaces/ItemBasePrices/IItemBasePriceForm"

export const create = async (itemId: number, data: IItemBasePriceForm) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `items/${itemId}/base-prices`,
    body: data
  })
}

export const get = async (itemId: number, id: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/base-prices/${id}`,
  })
}

export const getAll = async (itemId: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/base-prices`,
  })
}

export const update = async (itemId: number, id: number, data: IItemBasePriceForm) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `items/${itemId}/base-prices/${id}`,
    body: data
  })
}