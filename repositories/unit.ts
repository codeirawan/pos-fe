export const create = async (name: string) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'units',
    body: { name }
  })
}

export const getAll = async () => {
  return useNuxtApp().$fetcher({
    url: `units`,
  })
}

export const getAllWithoutSelf = async (itemId: string) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/units`,
  })
}

export const get = async (id: number) => {
  return useNuxtApp().$fetcher({
    url: `units/${id}`,
  })
}

export const update = async (id: number, name: string) => {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `units/${id}`,
    body: { name }
  })
}