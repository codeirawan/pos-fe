import ISaleFormItems from "./ISaleFormItem"

export default interface ISaleForm {
  id?: number
  invoice_number: string
  account_id: number | null
  account_name: string
  item_id_history?: number
  customer_id?: number
  customer_name?: string
  invoice_amount: number
  paid_amount?: number | null
  payment_method: string
  items: ISaleFormItems[]
  add_payment: number
  created_by_name: string
  created_at: string
  requestOtpModal: boolean
  verificationOtpModal: boolean
  whatsapp_number?: string
  otp_code: string
  police_number: string
  send_all: number
}
