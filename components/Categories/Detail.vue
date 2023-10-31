<script setup lang="ts">
const module = 'categories'
const category = useCategoryStore()
onNuxtReady(() => {
  category.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="category.categoryForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="category.categoryForm.name" />
  </div>
</template>