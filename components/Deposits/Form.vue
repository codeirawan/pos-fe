<script setup lang="ts">
const module = 'deposits'
const deposit = useDepositStore()
const rule = useRule()
const account = useAccountStore()

await account.getAll()

onNuxtReady(() => {
  deposit.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <q-form @submit="deposit.submitForm" @reset="deposit.resetForm" @validation-error="$formValidationError">
    <forms-input v-model.number="deposit.depositForm.voucher_number" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.voucherNumber')" :autofocus="true" />
    <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.account')" v-model="deposit.depositForm.account_id" :options="account.accounts" />
    
    <forms-date-picker :required="true" :rules="[rule.required, rule.date]" :label="$getTranslation('shared.columns.date')" v-model="deposit.depositForm.date" />

    <forms-input v-model="deposit.depositForm.description" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.description')" type="textarea" />

    <deposits-entry-table class="mb-4" />

    <span class="text-bold">{{ $getTranslation('shared.labels.totalPrice') }}</span>: {{ $formatPrice(deposit.getTotalAmount) }}

    <forms-action-button :loading="deposit.loading" />
  </q-form>
</template>
