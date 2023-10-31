import IWarehouseReceivingItem from "./IWarehouseReceivingItem"
import IWarehouseReceivingPayment from "./IWarehouseReceivingPayment"

export default interface IWarehouseReceiving {
  id: number
  supplier_id: number
  warehouse_id: number
  supplier_store_name: string
  supplier_name: string
  warehouse_name: string
  created_at: string
  items: IWarehouseReceivingItem[]
}