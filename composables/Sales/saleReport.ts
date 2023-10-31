import { defineStore } from 'pinia'
import { getSaleReport } from '~/repositories/sale'
import ISaleReport from '~/interfaces/Sales/ISaleReport'

export const useSaleReportStore = defineStore('saleReport', {
  state: () => ({
    loading: false,
    saleReport: {} as ISaleReport,
    warehouse_id: null as number | null,
    year: null as string | null
  }),
  actions: {
    async getSaleReport() {
      const nuxt = useNuxtApp()
      this.loading = true

      let response = null as any; let success = false; let message = ''
      try {
        response = await getSaleReport()
        success = response.success
        message = response.message
        this.saleReport = response.data
      }
      catch (error: any) {
        message = error.data.message
        nuxt.$notify(success, message)
      }

      this.loading = false
    },
  },
})
