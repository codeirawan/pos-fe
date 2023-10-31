import { IAPI } from "~/interfaces/IAPI"

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      fetcher({
        method = 'GET',
        url,
        headers,
        body,
        withToken = true,
        withStoreId = true,
        withWarehouseId = false,
        accessToken = null,
        silentNotif = false
      }: IAPI): Promise<unknown> {
        const { token } = useAuth()

        let finalUrl = `/${nuxtApp.vueApp.$nuxt.$getLocale()}/`

        if (withWarehouseId && nuxtApp.vueApp.$nuxt.$getActiveModule() === 'warehouses') {
          finalUrl += `warehouses/${nuxtApp.vueApp.$nuxt.$getWarehouseId()}/`
        } else if (withStoreId && nuxtApp.vueApp.$nuxt.$getActiveModule() === 'stores') {
          finalUrl += `${nuxtApp.vueApp.$nuxt.$getStoreId()}/`
        }

        finalUrl += url

        let headerBuild = {}

        if (withToken) {
          headerBuild = {
            Authorization: token.value
          }
        }

        return $fetch(finalUrl, {
          baseURL: nuxtApp.$config.public.apiBaseUrl,
          method,
          body,
          headers: headerBuild
        })
      }
    }
  }
})
