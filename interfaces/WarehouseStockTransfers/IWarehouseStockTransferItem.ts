export default interface IWarehouseStockTransferItem {
  id: number
  item_id: number
  item_name: string
  item_code: string
  unit_id: number
  unit_name: string
  stock: number | null
  quantity: number | null
  purchase_price: string
  supplier_id: number
  supplier_name: number
  warehouse_id: number | null
  warehouse_old_id: number | null
  warehouse_name: number
  item_base_price_id: number
}