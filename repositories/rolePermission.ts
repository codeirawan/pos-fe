export const create = async (roleId: number, permissionId: number) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `roles/${roleId}/permissions`,
    body: { 
      permission_id: permissionId  
    }
  })
}