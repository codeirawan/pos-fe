import ISaleFormItems from "./ISaleFormItem"
import ISalePayment from "./ISalePayment"

export default interface ISale {
  id: number
  invoice_number: string
  created_at: string
  account_id: number
  account_name: string
  customer_id?: number
  customer_name?: string
  invoice_amount: number
  paid_amount: number
  outstanding_amount: number
  returned_amount: number
  status: string
  payment_status: string
  delivery_status: string
  paid_at: string
  delivered_at: string
  delivered_by_name: string
  police_number: string
  tax_percentage: number
  tax_amount: number
  discount_value: number
  items: ISaleFormItems[]
  payments: ISalePayment[]
}