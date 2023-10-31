import IExpenseForm from "~/interfaces/Expenses/IExpenseForm"

export async function create(payload: IExpenseForm) {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'expenses',
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
    url: `expenses/${id}`,
  })
}

export async function update(payload: IExpenseForm) {
  return useNuxtApp().$fetcher({
    method: 'PUT',
    url: `expenses/${payload.id}`,
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
