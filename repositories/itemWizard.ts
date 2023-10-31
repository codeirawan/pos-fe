import IItemFormWizard from "interfaces/Items/IItemFormWizard"

export const create = async (data: IItemFormWizard) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: 'items',
    body: data
  })
}
