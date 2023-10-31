import IPurchaseForm from "interfaces/Purchases/IPurchaseForm"
import IPurchaseItem from '~/interfaces/Purchases/IPurchaseItem'

export async function create(data: IPurchaseForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'purchases',
    body: data,
  })
}

export async function createPurchasePayment(id: number, data: IPurchaseForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `purchases/${id}/payments`,
    body: { account_id: data.account_id,
      amount: data.paid_amount,
    },
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `purchases/${id}`,
  })
}

export const getItem = async (itemId: number) => {
  return useNuxtApp().$fetcher({
    url: `items/${itemId}/purchase-items`,
  })
}

export const submitAdminReceivingPurchaseItem = async (data: IPurchaseItem[]) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'purchase-items',
    body: { 'items': data },
  })
}

export async function update(id: number, data: IPurchaseForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `purchases/${id}`,
    body: data,
  })
}
