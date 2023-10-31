export const create = async (name: string) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'categories',
    body: { name }
  })
}

export const get = async (id: number) => {
  return useNuxtApp().$fetcher({
    url: `categories/${id}`,
  })
}

export const update = async (id: number, name: string) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `categories/${id}`,
    body: { name }
  })
}