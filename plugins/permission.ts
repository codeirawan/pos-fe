export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      hasAccess(permissionName: string): boolean {
        return nuxtApp.vueApp.$nuxt.$hasPermission(permissionName) || nuxtApp.vueApp.$nuxt.$hasRole('SUPER ADMIN')
      },
      hasPermission(permissionName: string): boolean {
        const { data } = useAuth()

        if (data.value) {
          const directPermission = data.value.permissions.find(
            (permission) => permission.name === permissionName
          );
        
          if (directPermission) {
            return true;
          }
        
          // Check if any of the user's roles have the permission
          for (const role of data.value.roles) {
            const rolePermission = role.permissions.find(
              (permission) => permission.name === permissionName
            );
        
            if (rolePermission) {
              return true;
            }
          }
        }

        // Permission not found in user or roles
        return false;
      },
      hasRole(roleName: string): boolean {
        const { data } = useAuth()
        if (data.value) {
          return data.value.roles.some((role) => role.name.toLowerCase() === roleName.toLowerCase());
        }
        return false;
      }
    }
  }
})