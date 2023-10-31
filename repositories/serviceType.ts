export async function create(name: string) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'service-types',
    body: { name },
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `service-types`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `service-types/${id}`,
  })
}

export async function update(id: number, name: string) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `service-types/${id}`,
    body: { name },
  })
}
