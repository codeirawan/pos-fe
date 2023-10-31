import ISendSaleItemForm from "~/interfaces/SaleItems/ISendSaleItemForm"

export const create = async (saleId: number, saleItemId: number, data: ISendSaleItemForm) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `sales/${saleId}/items/${saleItemId}/send`,
    body: data
  })
}