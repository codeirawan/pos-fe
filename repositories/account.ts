import IAccountTypeForm from "interfaces/AccountTypes/IAccountTypeForm"

export async function create(data: IAccountTypeForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'accounts',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `accounts`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `accounts/${id}`,
  })
}

export async function update(id: number, data: IAccountTypeForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `accounts/${id}`,
    body: data,
  })
}
