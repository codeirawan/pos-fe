import IForm from '~/interfaces/PurchaseReturns/IPurchaseReturnForm'

export async function create(data: IForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'purchase-returns',
    body: data,
  })
}

export async function get(purchaseReturnId: number) {
  return useNuxtApp().$fetcher({
    url: `purchase-returns/${purchaseReturnId}`,
  })
}

export async function getReturnItem(purchaseReturnId: number) {
  return useNuxtApp().$fetcher({
    url: `purchase-returns/${purchaseReturnId}/items`,
  })
}

export async function getPurchaseItem(purchaseiId: number) {
  return useNuxtApp().$fetcher({
    url: `purchases/${purchaseiId}/item-returns`,
  })
}