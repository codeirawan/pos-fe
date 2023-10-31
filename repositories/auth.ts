export const login = async (email: string, password: string) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'login',
    body: { email, password },
    withToken: false,
    withStoreId: false
  })
}