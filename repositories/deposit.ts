import IDepositForm from "~/interfaces/Deposits/IDepositForm"

export async function create(payload: IDepositForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'deposits',
    body: {
      account_id: payload.account_id,
      voucher_number: payload.voucher_number,
      date: payload.date,
      description: payload.description,
      amount: payload.amount,
      entries: payload.entries
    },
  })
}

export async function get(id: number) {
  return useNuxtApp().$fetcher({
    url: `deposits/${id}`,
  })
}

export async function update(payload: IDepositForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `deposits/${payload.id}`,
    body: {
      account_id: payload.account_id,
      voucher_number: payload.voucher_number,
      date: payload.date,
      description: payload.description,
      amount: payload.amount,
      entries: payload.entries
    },
  })
}
