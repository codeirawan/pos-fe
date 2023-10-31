<script setup lang="ts">
const module = 'customers'
const customer = useCustomerStore()
const rule = useRule()
onNuxtReady(() => {
  customer.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="customer.submitForm" @reset="customer.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="customer.customerForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-input :required="true" :rules="[rule.required, rule.nonNegativeNumber]" :label="$getTranslation('shared.columns.limitOutstandingAmount')" v-model="customer.customerForm.limit_outstanding_amount" type="number" />
      <forms-action-button :loading="customer.loading" />
    </q-form>
  </div>
</template>
