<script setup lang="ts">
const module = 'categories'
const module2 = 'sub-categories'
const route = useRoute()
const fullModule = `categories/${route.params.category_id}/${module2}`
const tableColumn = useTableColumn()
</script>
<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :page="$getTranslation(`modules.${$toCamelCase(module2)}.title`)" />
  <div>
    <forms-data-table :columns="tableColumn.subCategoriesTable" :module="fullModule" :title="$getTranslation(`modules.${$toCamelCase(module2)}.title`)"/>
  </div>
</template>
