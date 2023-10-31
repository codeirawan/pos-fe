import IItemUnit from '~/interfaces/ItemUnits/IItemUnit'
export default interface IWarehouseReceivingFormItem {
  id: number
  item_id: number
  item_name: string
  item_code: string
  item_units: IItemUnit[],
  unit_id: number
  unit_name: string
  selected_unit_id: number
  selected_unit_name: string
  quantity: number | null
  received_quantity: number
  outstanding_quantity: number
  selected_quantity: number | null
  selected_base_quantity: number | null
  supplier_id: number
}