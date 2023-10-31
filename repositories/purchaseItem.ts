import IReceivePurchaseItemForm from "~/interfaces/PurchaseItems/IReceivePurchaseItemForm"

export const create = async (purchaseId: number, purchaseItemId: number, data: IReceivePurchaseItemForm) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `purchases/${purchaseId}/items/${purchaseItemId}/receive`,
    body: data
  })
}