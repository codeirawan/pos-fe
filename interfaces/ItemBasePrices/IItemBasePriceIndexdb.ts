export default interface IItemBasePriceIndexdb {
  id: number
  item_id: number
  purchase_price: string
  cost: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at?: string
  deteled_by?: number
}
