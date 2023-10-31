import IPriceCategory from "~/interfaces/PriceCategories/IPriceCategory"

export default interface IItem {
  id: number
  store_id: number
  name: string
  code: string
  barcode: string
  sub_category_id: number
  sub_category_name: string
  supplier_id: number
  supplier_name: string
  category_name: string
  unit_id: number
  unit_name: string
  delete: boolean
}