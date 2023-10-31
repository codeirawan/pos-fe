export const notify = async () => {
  return useNuxtApp().$fetcher({
    url: `item-stocks/notify`,
  })
}
