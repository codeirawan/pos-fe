import ICustomerForm from "interfaces/Customers/ICustomerForm"

export async function create(data: ICustomerForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'customers',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `customers`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `customers/${id}`,
  })
}

export async function update(id: number, data: ICustomerForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `customers/${id}`,
    body: data,
  })
}
