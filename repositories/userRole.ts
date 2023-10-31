export const create = async (userId: number, roleId: number) => {
  return useNuxtApp().$fetcher({
    method: 'POST',
    url: `users/${userId}/roles`,
    body: { 
      role_id: roleId  
    }
  })
}
