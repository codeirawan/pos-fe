export default interface IPurchaseItem {
  id?: number
  item_id: number
  item_name: string
  item_code: string
  unit_name: string
  price: number | null
  quantity: number
  received_quantity: number
  receiving_quantity: number
  outstanding_quantity: number
  warehouse_id: number
  warehouse_receiving_item_id: number
}