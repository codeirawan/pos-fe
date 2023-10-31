export default interface IItemBasePriceIndexdb {
  id: number
  item_base_price_id: number
  price_category_id: number
  profit: string
  sell_price: string
  default_price: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at?: string
  deleted_by?: number
  store_id: number
  item_id: number
  item_name: string
  item_code: string
  unit_name: string
  price_category_name: string
  purchase_prices: string
  cost: string
}
