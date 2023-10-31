export async function create(name: string) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'expeditions',
    body: { name },
  })
}

export async function getAll() {
  return useNuxtApp().$fetcher({
    url: `expeditions`,
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `expeditions/${id}`,
  })
}

export async function update(id: number, name: string) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `expeditions/${id}`,
    body: { name },
  })
}
