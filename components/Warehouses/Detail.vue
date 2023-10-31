<script setup lang="ts">
const module = 'warehouses'
const warehouse = useWarehouseStore()
onNuxtReady(() => {
  warehouse.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="warehouse.warehouseForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="warehouse.warehouseForm.name" />
    <forms-label :label="$getTranslation('shared.columns.address')" :value="warehouse.warehouseForm.address" />
  </div>
</template>
