import IStoreForm from "interfaces/Stores/IStoreForm"

export async function create(data: IStoreForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'stores',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `stores`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `stores/${id}`,
  })
}

export async function update(id: number, data: IStoreForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `stores/${id}`,
    body: data,
  })
}
