<script setup lang="ts">
const module = 'stock-adjustments'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.stockAdjustmentsTable" module="item-stock-adjustments" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasEditButton="false" :hasDeleteButton="false" :customLinkForm="module"/>
  </div>
</template>
