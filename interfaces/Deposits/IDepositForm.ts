import IDepositEntry from "./IDepositEntry"

export default interface IDepositForm {
  id: number | undefined
  account_id: number | undefined
  account_name: string | undefined
  voucher_number: string | undefined
  date: string | undefined
  description: string | undefined
  amount: number | undefined
  entries: IDepositEntry[]
}