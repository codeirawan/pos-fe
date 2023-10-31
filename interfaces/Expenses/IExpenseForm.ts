import IExpenseEntry from "./IExpenseEntry"

export default interface IExpenseForm {
  id: number | undefined
  account_id: number | undefined
  account_name: string | undefined
  voucher_number: string | undefined
  date: string | undefined
  description: string | undefined
  amount: number | undefined
  entries: IExpenseEntry[]
}