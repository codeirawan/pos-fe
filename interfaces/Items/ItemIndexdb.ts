export default interface Items {
  id?: number
  store_id: number
  unit_id: number
  code: string
  name: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at?: string
  deleted_by?: number
  unit_name: string
  sub_category_name: string
  category_name: string
}
