import IPurchaseItem from "./IPurchaseItem"
import IPurchasePayment from "./IPurchasePayment"

export default interface IPurchase {
  id: number
  invoice_number: string
  tax_invoice_number: string | null
  supplier_id: number
  supplier_name: string
  invoice_date: string
  due_date: string
  report_date: string | null
  receive_date: string
  invoice_amount: number
  description: string | null
  paid_amount: number
  outstanding_amount: number
  returned_amount: number
  payment_status: string
  paid_at: string
  delivery_status: string
  delivered_at: string
  tax_percentage: number
  tax_amount: number
  discount_value: number
  items: IPurchaseItem[]
  payments: IPurchasePayment[]
}