<script setup lang="ts">
const module = 'deposits'
const deposit = useDepositStore()
const tableColumn = useTableColumn()
const route = useRoute()
onNuxtReady(() => {
  deposit.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="deposit.depositForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.voucherNumber')" :value="deposit.depositForm.voucher_number" />
    <forms-label :label="$getTranslation('shared.columns.description')" :value="deposit.depositForm.description" />
    <forms-label :label="$getTranslation('shared.columns.amount')" :value="$formatPrice(deposit.depositForm.amount!)" />
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.entry')" :columns="tableColumn.depositEntriesTable" :module="`deposits/${route.params.deposit_id}/entries`" :hasCreateButton="false" />
  </div>
</template>
