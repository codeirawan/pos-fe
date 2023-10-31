import { scroll } from 'quasar'

const { getScrollTarget, setVerticalScrollPosition } = scroll

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      rulesRequired(val: string) {
        let isPassed = false
        if (typeof val === 'object' && val)
          isPassed = true

        else
          isPassed = !!(val && val.length > 0)

        return isPassed || nuxtApp.vueApp.$nuxt.$i18n.t('shared.labels.required')
      },
      formValidationError(ref: any): void {
        try {
          const el = ref.$el
          setVerticalScrollPosition(getScrollTarget(el), el.offsetTop, 1000)
        }
        catch (error) {

        }
      },
    },
  }
})
