import IItemUnit from '~/interfaces/ItemUnits/IItemUnit'
import IItemBasePrice from '~/interfaces/ItemBasePrices/IItemBasePrice'
export default interface IPurchaseFormItem {
  id?: number
  item_base_price_id?: number
  item_id: number
  item_name: string
  item_code: string
  item_units?: IItemUnit[],
  base_prices?: IItemBasePrice[],
  unit_name: string
  selected_unit_id?: number
  selected_unit_name: string
  price: number | null
  quantity: number | null
  selected_quantity: number | null
  selected_base_quantity?: number | null
  supplier_id?: number | null
  total_price: number | null
  discount_percentage: number | null
  discount_value: number | null
  sub_total_price: number
  tax: number
}