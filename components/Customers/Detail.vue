<script setup lang="ts">
const module = 'customers'
const customer = useCustomerStore()

onNuxtReady(() => {
  customer.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="customer.customerForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="customer.customerForm.name" />
    <forms-label :label="$getTranslation('shared.columns.limitOutstandingAmount')" :value="$formatPrice(customer.customerForm.limit_outstanding_amount)" />
  </div>
</template>
