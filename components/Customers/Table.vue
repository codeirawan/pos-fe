<script setup lang="ts">
const module = 'customers'
const tableColumn = useTableColumn()
</script>

<template>
  <div>
    <forms-data-table :columns="tableColumn.customersTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"/>
  </div>
</template>
