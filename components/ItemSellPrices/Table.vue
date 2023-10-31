<script setup lang="ts">
const tableColumn = useTableColumn()
const route = useRoute()
const params = {
  item_id: parseInt(route.params.item_id.toString()),
  item_base_price_id: parseInt(route.params.base_price_id.toString()),
}
</script>

<template>
  <forms-data-table :title="`${$getTranslation('shared.labels.list')} ${$getTranslation('shared.columns.sellPrice')}`" :columns="tableColumn.itemSellPricesTableByBasePrice" :module="`items/${route.params.item_id}/base-prices/${route.params.base_price_id}/sell-prices`" subModule="sell-prices" />

  <!-- Temporary Disable IndexDB -->
  <!-- <forms-data-table-indexdb :title="`${$getTranslation('shared.labels.list')} ${$getTranslation('shared.columns.sellPrice')}`" :columns="tableColumn.itemSellPricesTableByBasePrice" module="sell-prices" subModule="sell-prices" :params="params" :uri-detail="`items/${route.params.item_id}/base-prices/${route.params.base_price_id}/sell-prices`" /> -->
</template>
