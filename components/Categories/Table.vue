<script setup lang="ts">
const module = 'categories'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.categoriesTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"></forms-data-table>
  </div>
</template>
