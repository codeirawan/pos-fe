export default defineNuxtPlugin(() => {
  const nuxt = useNuxtApp()

  return {
    provide: {
      toCamelCase(source: string): string {
        return source.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase() })
      },
      toHyphenCase(source: string): string {
        return source.replace(/([a-z][A-Z])/g, (g) => { return `${g[0]}-${g[1].toLowerCase()}` })
      },
      formatPrice(value: number) {
        const val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      formatThousand(value: number) {
        const val = (value / 1)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      formatDate(value: string, type = 'dateTime') {
        if (value == null) return ''
        // Step 1: Convert date string to JavaScript Date object
        const jsDate = new Date(value)

        // Step 2: Define the desired date format (you can customize this format)
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          locale: 'id-ID',
        }

        // Step 3: Format the JavaScript Date object to the desired format
        const formattedDate = jsDate.toLocaleDateString('id-ID', options)

        if (formattedDate.includes('pukul')) {
          return type === 'dateTime' ? formattedDate.replace('pukul ', '') : formattedDate.split(' pukul ')[0]
        } else {
          return formattedDate
        }
      },
      formatBoolean(value: number) {
        return (value === 1 ? nuxt.$getTranslation('shared.buttons.yes') : nuxt.$getTranslation('shared.buttons.no')).toUpperCase()
      },
      formatDate2(dateString: string | number | Date): string {
        const dateObj = new Date(dateString)

        const year = dateObj.getUTCFullYear()
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
        const day = String(dateObj.getUTCDate()).padStart(2, '0')
        const hours = String(dateObj.getUTCHours()).padStart(2, '0')
        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
        const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      },
      padNumberWithZeros(number: number, length: number = 5) {
        // Convert the number to a string
        let numberStr = number.toString();

        // Calculate the number of zeros to pad with
        let zerosToPad = length - numberStr.length;

        // Create the padded string with leading zeros
        let paddedString = '0'.repeat(zerosToPad) + numberStr;

        return paddedString;
      },
      taxPercentage(): number {
        const { data } = useAuth()
        const route = useRoute()
        if (route.params.store_id) {
          const activeStore = data.value!.stores.find(store => store.id === parseInt(route.params.store_id.toString()))
          if (activeStore) {
            return activeStore.tax_percentage;
          } else {
            return 0;
          }
        }
      }
    },
  }
})
