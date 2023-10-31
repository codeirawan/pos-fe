import ISaleReturnFormItems from "./ISaleReturnFormItem"

export default interface ISaleForm {
  id?: number
  sale_id: number
  description?: string
  invoice_number: string
  invoice_amount: number
  created_at: string
  status: string
  pic: string
  items: ISaleReturnFormItems[]
}
