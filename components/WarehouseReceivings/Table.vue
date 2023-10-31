<script setup lang="ts">
const module = 'warehouse-receivings'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.warehouseReceivingTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasEditButton="false" :withWarehouseId="true" />
  </div>
</template>
