import ISaleForm from "interfaces/Sales/ISaleForm"

export async function create(data: ISaleForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'sales',
    body: data,
  })
}

export async function createSalePayment(id: number, data: ISaleForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `sales/${id}/payments`,
    body: {
      account_id: data.account_id,
      amount: data.paid_amount,
      customer_id: data.customer_id
    },
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `sales/${id}`,
  })
}

export async function getSaleitems(id: number, typePrint: string) {
  return useNuxtApp().$fetcher({
    url: `sales/${id}/items/${typePrint}/print`,
  })
}

export async function update(id: number, data: ISaleForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `sales/${id}`,
    body: data,
  })
}

export async function requestOtp(data: ISaleForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'sales/request-otp',
    body: data,
  })
}

export async function verificationOtp(data: ISaleForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'sales/verification-otp/' + data.otp_code,
    body: data,
  })
}

export async function getSaleReport() {
  return useNuxtApp().$fetcher({
    url: `sales/reports`,
  })
}