import IWarehouseForm from '~/interfaces/Warehouses/IWarehouseForm'

export async function create(data: IWarehouseForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'warehouses',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `warehouses`,
    withStoreId: false,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `warehouses/${id}`,
  })
}

export async function update(data: IWarehouseForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `warehouses/${data.id}`,
    body: data,
  })
}
