import { Notify } from 'quasar'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      notify(success: boolean, message?: string, position?: "top-right" | "top-left" | "bottom-left" | "bottom-right" | "top" | "bottom" | "left" | "right" | "center" | undefined) {
        const appliedPosition = position ? position : 'top-right'
        Notify.create({
          color: success === true ? 'positive' : 'negative',
          textColor: 'white',
          icon: 'done',
          message: message ? message : (success == true ? nuxtApp.vueApp.$nuxt.$i18n.t('shared.labels.success') : nuxtApp.vueApp.$nuxt.$i18n.t('shared.labels.failed')),
          position: appliedPosition
        })
      }
    }
  }
})
