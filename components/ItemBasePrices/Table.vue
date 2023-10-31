<script setup lang="ts">
const tableColumn = useTableColumn()
const route = useRoute()
const parId = route.params.item_id
const itemId = parseInt(parId.toString())
</script>

<template>
  <forms-data-table :columns="tableColumn.itemBasePricesTable" :module="`items/${itemId}/base-prices`" subModule="base-prices" :title="`${$getTranslation('shared.labels.list')} ${$getTranslation('shared.columns.purchasePrice')}`" />

  <!-- Temporary Remove IndexDB -->
  <!-- <forms-data-table-indexdb :title="`${$getTranslation('shared.labels.list')} ${$getTranslation('shared.columns.purchasePrice')}`" :columns="tableColumn.itemBasePricesTable" module="base-prices" subModule="base-prices" :params="{ item_id: itemId }" :uri-detail="`items/${route.params.item_id}/base-prices`" /> -->
</template>
