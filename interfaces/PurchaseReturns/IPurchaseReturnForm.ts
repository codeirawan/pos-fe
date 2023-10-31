import IPurchaseReturnFormItems from "./IPurchaseReturnFormItem"

export default interface IPurchaseForm {
  id?: number
  purchase_id: number
  description?: string
  invoice_number: string
  invoice_amount: number
  created_at: string
  status: string
  pic: string
  items: IPurchaseReturnFormItems[]
}
