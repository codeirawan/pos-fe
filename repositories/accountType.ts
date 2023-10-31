export async function create(name: string) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'account-types',
    body: { name },
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `account-types`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `account-types/${id}`,
  })
}

export async function update(id: number, name: string) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `account-types/${id}`,
    body: { name },
  })
}
