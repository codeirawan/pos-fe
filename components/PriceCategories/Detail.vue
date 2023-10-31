<script setup lang="ts">
const module = 'price-categories'
const priceCategory = usePriceCategoryStore()
onNuxtReady(() => {
  priceCategory.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="priceCategory.priceCategoryForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="priceCategory.priceCategoryForm.name" />
  </div>
</template>
