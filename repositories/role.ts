import IRoleForm from "interfaces/Roles/IRoleForm"

export async function create(data: IRoleForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'roles',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `roles`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `roles/${id}`,
  })
}

export async function update(id: number, data: IRoleForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `roles/${id}`,
    body: data,
  })
}
