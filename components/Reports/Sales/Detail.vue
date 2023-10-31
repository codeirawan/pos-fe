<script setup lang="ts">
const saleReport = useSaleReportStore()
const auth = useAuthStore()

onNuxtReady(() => {
  saleReport.getSaleReport()
})
</script>

<template>
  <div class="row q-col-gutter-x-lg q-col-gutter-y-lg text-center">
    <div class="col-12 col-md-8"></div>
    <div class="col-12 col-md-4">
      <forms-select :label="$getTranslation('shared.columns.year')" v-model="saleReport.year" :options="[2023, 2022, 2021]" />
    </div>
    <div class="col-12 col-sm-4">
      <p class="text-bold">{{ $getTranslation('shared.labels.totalSales') }}</p>
      <h3>{{ saleReport.saleReport.total_sales ? $formatThousand(saleReport.saleReport.total_sales) : '-' }}</h3>
    </div>
    <div class="col-12 col-sm-4">
      <p class="text-bold">{{ $getTranslation('shared.labels.totalDefaultPrice') }}</p>
      <h3>{{ auth.getSelectedStore.currency }} {{ saleReport.saleReport.total_default_price ? $formatThousand(saleReport.saleReport.total_default_price) : '-' }}</h3>
    </div>
    <div class="col-12 col-sm-4">
      <p class="text-bold">{{ $getTranslation('shared.labels.totalFinalSellPrice') }}</p>
      <h3>{{ auth.getSelectedStore.currency }} {{ saleReport.saleReport.total_final_sell_price ? $formatThousand(saleReport.saleReport.total_final_sell_price) : '-' }}</h3>
    </div>
  </div>
  <reports-sales-outstanding-table />
</template>

