export default interface ItemStock {
  id?: number
  item_stock_id: number
  store_id: number
  item_id: string
  item_name: string
  item_code: string
  warehouse_id: number
  warehouse_name: string
  item_base_price_id: number
  purchase_price: string
  cost: number
  stock: string
}
