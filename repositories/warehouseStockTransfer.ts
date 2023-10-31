import IWarehouseStockTransferItem from '~/interfaces/WarehouseStockTransfers/IWarehouseStockTransferItem'

export async function transferStock(data: IWarehouseStockTransferItem) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'item-stock-transfers',
    body: data,
  })
}
