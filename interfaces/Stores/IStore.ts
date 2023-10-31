export default interface IStore {
  id: number
  name: string
  invoice_prefix: string
  master_password: string
  tax_percentage: number
  sale_lower_price_permission: number
  sale_lower_price_whatsapp_number: string
  address: string
  created_at: string
  created_by: string
}