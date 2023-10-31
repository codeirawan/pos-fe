export default defineNuxtPlugin((nuxtApp) => {
  const localePath = useLocalePath()
  const route = useRoute()

  function validatePath(path: string, storeId: string) {
    if (path && path.length > 0 && path[0] !== '/' && storeId !== '')
      path = `/${path}`

    if (path.indexOf("{storeId}") >= 0) {
      path = path.replace('{storeId}', storeId)
    }

    if (path.indexOf("{warehouseId}") >= 0) {
      path = path.replace('{warehouseId}', storeId)
    }

    return path
  }

  return {
    provide: {
      navigate(to: string): void {
        let storeId = route.params?.store_id?.toString() ?? ''
        if (!storeId) {
          storeId = route.params?.warehouse_id?.toString() ?? ''
        }
        if (to && to.length > 0) {
          to = validatePath(to, storeId)
          // Push route according to selected locale
          navigateTo({
            path: to,
          })
        }
      },
      getLocalePath(to: string): string {
        let storeId = route.params?.store_id?.toString() ?? ''
        if (!storeId) {
          storeId = route.params?.warehouse_id?.toString() ?? ''
        }
        if (to && to.length > 0) {
          to = validatePath(to, storeId)
          // Return path according to selected locale
          return localePath({
            path: to,
            params: {
              store_id: storeId,
            },
          })
        }
        return ''
      },
      getLocale(): string {
        return nuxtApp.vueApp.$nuxt.$i18n.locale.value
      },
      getStoreId(): string {
        return route.params?.store_id?.toString() ?? '1'
      },
      getWarehouseId(): string {
        return route.params?.warehouse_id?.toString() ?? ''
      },
      getRouteParam(key: string): string {
        return route.params[key]?.toString()
      },
      getActiveModule(): string {
        return route.name!.toString().split('-')[0]?.toLowerCase()
      },
    },
  }
})
