import IUserForm from "interfaces/Users/IUserForm"

export async function create(data: IUserForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'users',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `users`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `users/${id}`,
  })
}

export async function update(id: number, data: IUserForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `users/${id}`,
    body: data,
  })
}
