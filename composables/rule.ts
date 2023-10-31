export function useRule() {
  const nuxt = useNuxtApp()

  const rules = {
    required: (val: string) => {
      let isPassed = false
      if (typeof val === 'object' || typeof val === 'number') {
        isPassed = true
      } else if (!val) {
      } else {
        isPassed = !!(val && val.length > 0)
      }
      return isPassed || nuxt.$getTranslation('shared.labels.required')
    },
    positiveNumber: (val: string) => {
      return (!val || (val && parseInt(val) >= 1)) || nuxt.$getTranslation('shared.labels.positiveNumber')
    },
    nonNegativeNumber: (val: string) => {
      return (!val || (val && parseInt(val) >= 0)) || nuxt.$getTranslation('shared.labels.nonNegativeNumber')
    },
    date: (val: string) => {
      const regEx = /^\d{4}-\d{2}-\d{2}$/;
      return (!val || val.match(regEx)) || nuxt.$getTranslation('shared.labels.date')
    },
    max: (val: number, max: number) => {
      return (!val || max == 0 || parseInt(val) <= parseInt(max)) || nuxt.$getTranslation('shared.labels.maxValue') + nuxt.$formatPrice(max)
    },
    min: (val: number, min: number) => {
      return (!val || min == 0 || parseInt(val) >= parseInt(min)) || nuxt.$getTranslation('shared.labels.minValue') + nuxt.$formatPrice(min)
    },
    maxDiscount: (val: number) => {
      return (!val || val <= 99) || nuxt.$getTranslation('shared.labels.maxDiscount')
    },
    maxQuantity: (val: number, max: number) => {
      return (val <= max) || nuxt.$getTranslation('shared.labels.exceedStock')
    },
  }

  return rules
}