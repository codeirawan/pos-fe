export default interface IExpense {
  id: number
  account_id: number
  account_name: string
  voucher_number: string
  date: string
  description: string
  amount: number
}