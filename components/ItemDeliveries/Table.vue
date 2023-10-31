<script setup lang="ts">
const module = 'item-deliveries'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.itemDeliveriesTable" module="sales" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasCancelButton="true" :hasEditButton="false" :hasDeleteButton="false" :hasCreateButton="false" :withWarehouseId="true" />
  </div>
</template>
