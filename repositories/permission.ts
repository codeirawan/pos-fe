import IPermissionForm from "interfaces/Permissions/IPermissionForm"

export async function create(data: IPermissionForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'permissions',
    body: data,
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `permissions`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `permissions/${id}`,
  })
}

export async function update(id: number, data: IPermissionForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `permissions/${id}`,
    body: data,
  })
}
