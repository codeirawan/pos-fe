import { permissionView } from "~/constants/permission";

function extractModuleName(input: string): string {
  const match = input.match(/store_id-(\w+)___id/);
  return match ? match[1] : '';
}

export default defineNuxtRouteMiddleware((to, from) => {
  const nuxt = useNuxtApp()

  // Check if user has the access to the targeted route
  const moduleName = extractModuleName(to.name!.toString())

  // Excluded urls
  const excludedRouteNames = ['dashboard', '']

  if (excludedRouteNames.indexOf(moduleName) === -1 && !nuxt.$hasAccess(`${permissionView} ${moduleName}`)) {
    nuxt.$notify(false, nuxt.$getTranslation('shared.notifications.unauthorized'))
    return abortNavigation()
  }
})