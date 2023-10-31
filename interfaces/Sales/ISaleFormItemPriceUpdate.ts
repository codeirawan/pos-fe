import ISaleFormItem from "./ISaleFormItem"

export default interface ISaleFormItemPriceUpdate extends ISaleFormItem {
  master_password: string | null
  discount_percentage: number | null
  discount_amount: number | null
  final_sell_price: number | null
}