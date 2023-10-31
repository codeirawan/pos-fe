import ISupplierForm from "interfaces/Suppliers/ISupplierForm"

export async function create(body: ISupplierForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'suppliers',
    body
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `suppliers`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `suppliers/${id}`,
  })
}

export async function update(id: number, body: ISupplierForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `suppliers/${id}`,
    body,
  })
}
