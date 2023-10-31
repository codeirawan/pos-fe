<script setup lang="ts">
const module = 'suppliers'
const supplier = useSupplierStore()
onNuxtReady(() => {
  supplier.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="supplier.supplierForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="supplier.supplierForm.name" />
    <forms-label :label="$getTranslation('shared.columns.code')" :value="supplier.supplierForm.code" />
  </div>
</template>
