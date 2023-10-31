import IStockAdjustmentItem from 'interfaces/StockAdjustments/IStockAdjustmentItem'

export async function adjustment(data: IStockAdjustmentItem) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'item-stock-adjustments',
    body: data,
  })
}
