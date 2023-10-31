import ISubCategory from "interfaces/SubCategories/ISubCategory"
import IUnit from "interfaces/Units/IUnit"

export default interface IItemForm {
  id?: number
  name: string
  code: string
  barcode: string | undefined
  supplier_id: number | null
  sub_category_id: number | null
  unit_id: number | null
  stock_alert: number
  // unit_name: string | null
  // prices: IPrice[]
  // units: IUnitQuantity[]
}

interface IPrice {
  price_category_id: number | null
  price_category_name: string
  price_category_required: number | null
  price: number | null
}

interface IUnitQuantity {
  unit_id: number | null
  quantity: number | null
}