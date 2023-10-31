<script setup lang="ts">
const module = 'expenses'
const expense = useExpenseStore()
const tableColumn = useTableColumn()
const route = useRoute()
onNuxtReady(() => {
  expense.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="expense.expenseForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.voucherNumber')" :value="expense.expenseForm.voucher_number" />
    <forms-label :label="$getTranslation('shared.columns.description')" :value="expense.expenseForm.description" />
    <forms-label :label="$getTranslation('shared.columns.amount')" :value="$formatPrice(expense.expenseForm.amount!)" />
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.entry')" :columns="tableColumn.expenseEntriesTable" :module="`expenses/${route.params.expense_id}/entries`" :hasCreateButton="false" />
  </div>
</template>
