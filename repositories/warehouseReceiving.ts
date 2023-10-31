import IWarehouseReceivingForm from "interfaces/WarehouseReceivings/IWarehouseReceivingForm"

export async function create(data: IWarehouseReceivingForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    withWarehouseId: true,
    url: 'warehouse-receivings',
    body: data,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    withWarehouseId: true,
    url: `warehouse-receivings/${id}`,
  })
}

export async function update(id: number, data: IWarehouseReceivingForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    withWarehouseId: true,
    url: `warehouse-receivings/${id}`,
    body: data,
  })
}
