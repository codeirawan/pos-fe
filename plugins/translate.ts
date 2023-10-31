export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getTranslation(key: string): string {
        return nuxtApp.vueApp.$nuxt.$i18n.t(key)
      }
    }
  }
})
