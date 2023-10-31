import IAccountType from "interfaces/AccountTypes/IAccountType"

export default interface IWarehouse {
  id: number
  name: string
  number?: string | null
  account_type: IAccountType
}