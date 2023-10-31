<script setup lang="ts">
const module = 'sales'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.salesTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasCancelButton="true" :hasReturnSaleButton="true" :hasEditButton="false" />
  </div>
</template>
