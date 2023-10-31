export const create = async (categoryId: number, name: string) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `categories/${categoryId}/sub-categories`,
    body: { name }
  })
}

export const getAll = async () => {
  return useNuxtApp().$fetcher({
    url: `sub-categories`,
  })
}

export const get = async (categoryId: number, id: number) => {
  return useNuxtApp().$fetcher({
    url: `categories/${categoryId}/sub-categories/${id}`,
  })
}

export const update = async (categoryId: number, id: number, name: string) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `categories/${categoryId}/sub-categories/${id}`,
    body: { name }
  })
}