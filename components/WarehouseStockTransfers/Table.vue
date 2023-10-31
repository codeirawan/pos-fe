<script setup lang="ts">
const module = 'warehouse-stock-transfers'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.warehouseStockTransfersTable" module="item-stock-transfers" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasEditButton="false" :hasDeleteButton="false" :customLinkForm="module" :withWarehouseId="true" />
  </div>
</template>
