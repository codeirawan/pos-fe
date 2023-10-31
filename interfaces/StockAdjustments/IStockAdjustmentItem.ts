export default interface IStockAdjustmentItem {
  id: number
  item_id: number
  item_name: string
  item_code: string
  unit_id: number
  unit_name: string
  stock: number | null
  stock_before: number | null
  stock_after: number | null
  purchase_price: string
  supplier_name: number
  warehouse_name: number
}