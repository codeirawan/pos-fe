import IItemSellPriceForm from "interfaces/ItemSellPrices/IItemSellPriceForm"

export const create = async (itemId: number, basePriceId: number, data: IItemSellPriceForm) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `items/${itemId}/base-prices/${basePriceId}/sell-prices`,
    body: data
  })
}

export const get = async (itemId: number, basePriceId: number, id: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/base-prices/${basePriceId}/sell-prices/${id}`,
  })
}

export const update = async (itemId: number, basePriceId: number, id: number, data: IItemSellPriceForm) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `items/${itemId}/base-prices/${basePriceId}/sell-prices/${id}`,
    body: data
  })
}