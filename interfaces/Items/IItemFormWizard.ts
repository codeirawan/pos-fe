export default interface IItemFormWizard {
  id?: number
  name: string
  code: string
  barcode: string | undefined
  supplier_id: number | null
  sub_category_id: number | null
  unit_id: number | null
  base_prices: IItemBasePriceForm[]
  units: IItemUnit[],
  stock_alert: number
}

interface IItemUnit {
  unit_id: number | undefined
  quantity: number | undefined
}

interface IItemBasePriceForm {
  purchase_price: number | undefined
  cost: number | undefined
  sell_prices: IItemSellPrice[]
  stocks: IItemStock[]
}

interface IItemSellPrice {
  price_category_id: number | undefined
  price_category_name: string | undefined
  profit: number | undefined
  sell_price: number | undefined
  default_price: number | undefined
  default_price_temp: number | undefined
}

interface IItemStock {
  warehouse_id: number | undefined
  warehouse_name: string | undefined
  stock: number | undefined
}