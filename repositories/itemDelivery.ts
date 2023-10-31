import ISaleFormItem from '~/interfaces/Sales/ISaleFormItem'

export async function submitDeliveryItem(id: number, data: ISaleFormItem[]) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `sales/${id}`,
    body: { 'items': data },
    withWarehouseId: true
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `sales/${id}`,
    withWarehouseId: true
  })
}

export async function getSaleitems(id: number) {
  return useNuxtApp().$fetcher({
    url: `sales/${id}/items`,
    withWarehouseId: true
  })
}