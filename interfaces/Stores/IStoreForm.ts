export default interface IStoreForm {
  id?: number
  name: string | undefined
  invoice_prefix: string | undefined
  tax_percentage: number | undefined
  sale_lower_price_permission: number
  whatsapp_number: string | undefined
  is_whatsapp_group: number
  address: string | undefined
}