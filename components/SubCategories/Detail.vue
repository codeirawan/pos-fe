<script setup lang="ts">
const module = 'categories'
const module2 = 'sub-categories'
const subCategory = useSubCategoryStore()
onNuxtReady(() => {
  subCategory.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :module2="module2" :title2="$getTranslation(`modules.${$toCamelCase(module2)}.title`)" page="Detail" page2="table" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="subCategory.subCategoryForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="subCategory.subCategoryForm.name" />
  </div>
</template>