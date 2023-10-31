<script setup lang="ts">
const module = 'expenses'
const expense = useExpenseStore()
const rule = useRule()
const account = useAccountStore()

await account.getAll()

onNuxtReady(() => {
  expense.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <q-form @submit="expense.submitForm" @reset="expense.resetForm" @validation-error="$formValidationError">
    <forms-input v-model.number="expense.expenseForm.voucher_number" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.voucherNumber')" :autofocus="true" />
    <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.account')" v-model="expense.expenseForm.account_id" :options="account.accounts" />
    
    <forms-date-picker :required="true" :rules="[rule.required, rule.date]" :label="$getTranslation('shared.columns.date')" v-model="expense.expenseForm.date" />

    <forms-input v-model="expense.expenseForm.description" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.description')" type="textarea" />

    <expenses-entry-table class="mb-4" />

    <span class="text-bold">{{ $getTranslation('shared.labels.totalPrice') }}</span>: {{ $formatPrice(expense.getTotalAmount) }}

    <forms-action-button :loading="expense.loading" />
  </q-form>
</template>
