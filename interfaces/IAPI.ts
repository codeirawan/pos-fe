interface IAPI {
  method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
  url: string
  headers?: Object
  body?: Object
  withToken?: boolean
  withStoreId?: boolean
  withWarehouseId?: boolean
  accessToken?: string | null
  silentNotif?: boolean
}

interface IAPIResponse {
  success: boolean
  message: string
  data: any
}

export {
  IAPI,
  IAPIResponse
}