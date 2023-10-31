export default interface ICustomerForm {
  id?: number
  name: string
  limit_outstanding_amount: number
  amount: number | null
}