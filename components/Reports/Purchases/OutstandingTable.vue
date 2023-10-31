<script setup lang="ts">
const rule = useRule()
const startDate = ref()
const endDate = ref()
const outstandingPurchaseTable = ref()
const tableUrl = ref(`purchases/outstanding`)

function buildDatePeriodParameter(): string {
  let dateParam = ''
  if (startDate.value) {
    dateParam += `?startDate=${startDate.value}`
  } 
  if (endDate.value) {
    if (dateParam === '') dateParam += `?`
    else dateParam += `&`
    dateParam += `endDate=${endDate.value}`
  }
  return dateParam
}

async function reloadTable() {
  tableUrl.value = `purchases/outstanding${buildDatePeriodParameter()}`
  await nextTick()
  outstandingPurchaseTable.value.reload()
}

</script>
<template>
  <div>
    <div class="row q-col-gutter-x-lg q-col-gutter-y-lg text-center mb-5">
      <div class="col-12 col-lg-3">
        {{ $getTranslation('shared.columns.invoiceDate') }}
      </div>
      <div class="col-6 col-lg-3">
        <forms-date-picker @change="reloadTable" :rules="[rule.date]" :label="$getTranslation('shared.columns.startDate')" v-model="startDate" />
      </div>
      <div class="col-6 col-lg-3">
        <forms-date-picker @change="reloadTable" :rules="[rule.date]" :label="$getTranslation('shared.columns.endDate')" v-model="endDate" />
      </div>
    </div>
    <forms-data-table ref="outstandingPurchaseTable" :columns="useTableColumn().outstandingPurchasesTable" :hasCreateButton="false" :title="$getTranslation(`modules.outstandingPurchases.title`)" :module="tableUrl" />
  </div>
</template>