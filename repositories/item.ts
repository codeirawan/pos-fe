import IItemForm from "interfaces/Items/IItemForm"

export const create = async (data: IItemForm) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'items',
    body: data
  })
}

export const getAll = async () => {
  return useNuxtApp().$fetcher({
    url: `items`,
  })
}

export const getAllBySupplierId = async (supplierId: number) => {
  return useNuxtApp().$fetcher({
    url: `suppliers/${supplierId}/items`,
  })
}

export const get = async (id: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${id}`,
  })
}

export const update = async (data: IItemForm) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `items/${data.id}`,
    body: data
  })
}