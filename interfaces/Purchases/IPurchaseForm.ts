import IPurchaseFormItem from "./IPurchaseFormItem"
import IPurchasePayment from "./IPurchasePayment"

export default interface IPurchaseForm {
  id?: number
  invoice_number: string
  tax_invoice_number?: string | null
  supplier_id: number
  warehouse_id: number
  invoice_date: string
  due_date: string
  invoice_amount: number
  paid_amount: number | null
  outstanding_amount: number
  returned_amount: number
  account_id: number | null
  item_id_history?: number
  add_payment: number
  description: string | null
  report_date: string | null
  receive_date: string
  add_expedition: number
  shipping_price: number | null
  expedition_id: number | null
  include_tax: number
  items: IPurchaseFormItem[]
  payments: IPurchasePayment[]
}