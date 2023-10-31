export async function create(name: string) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'price-categories',
    body: { name },
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `price-categories`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `price-categories/${id}`,
  })
}

export async function update(id: number, name: string) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `price-categories/${id}`,
    body: { name },
  })
}
