import IForm from '~/interfaces/SaleReturns/ISaleReturnForm'

export async function create(data: IForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'sale-returns',
    body: data,
  })
}

export async function get(saleReturnId: number) {
  return useNuxtApp().$fetcher({
    url: `sale-returns/${saleReturnId}`,
  })
}

export async function getReturnItem(saleReturnId: number) {
  return useNuxtApp().$fetcher({
    url: `sale-returns/${saleReturnId}/items`,
  })
}

export async function getSaleItem(saleiId: number) {
  return useNuxtApp().$fetcher({
    url: `sales/${saleiId}/item-returns`,
  })
}