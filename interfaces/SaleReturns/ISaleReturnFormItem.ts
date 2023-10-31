import IItemUnit from '~/interfaces/ItemUnits/IItemUnit'
export default interface ISaleFormItem {
  item_stock_id: number
  item_sell_price_id: number
  price_category_name: string
  purchase_price: number
  cost: number
  profit: number
  item_units: IItemUnit[],
  item_name: string
  item_id: number
  warehouse_name: string
  item_code: string
  unit_name: string
  selected_unit_id: number
  selected_unit_name: string
  sell_price: number
  final_sell_price: number
  total_price: number
  total_return_amount: number
  master_password: string | null
  category_name: string
  sub_category_name: string
  default_price: number
  quantity: number
  returned_quantity: number
  returned_quantity_old: number
  received_quantity: number
  received_quantity_old: number
  selected_quantity: number | null
  selected_base_quantity: number | null
  discount_percentage: number | null
  discount_value: number | null
  description: string
}