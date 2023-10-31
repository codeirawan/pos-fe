import IWarehouseReceivingFormItem from "./IWarehouseReceivingFormItem"
import IWarehouseReceivingImageProof from "./IWarehouseReceivingImageProof"

export default interface IWarehouseReceivingForm {
  id?: number
  warehouse_id: number | null
  supplier_id: number | null
  items: IWarehouseReceivingFormItem[]
  ImageProofs: string[]
}