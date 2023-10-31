export const create = async (userId: number, storeId: number) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `users/${userId}/stores`,
    body: { 
      store_id: storeId  
    }
  })
}

export const getAll = async (userId: number) => {
  return useNuxtApp().$fetcher({
    url: `users/${userId}/store`,
  })
}

export const del = async (userId: number, storeId: number) => {
  return useNuxtApp().$fetcher({
    method: 'DELETE',
    url: `users/${userId}/stores/${storeId}`
  })
}