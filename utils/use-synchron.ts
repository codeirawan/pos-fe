export default async function (storeId: number, withStoreId = true) {
  await useSynchronItems(storeId, withStoreId)
  await useSynchronBasePrices(storeId)
  await useSynchronSellItems(storeId)
}
