<script setup lang="ts">
const tableColumn = useTableColumn()
const route = useRoute()
const params = {
  item_id: parseInt(route.params.item_id.toString()),
  item_base_price_id: parseInt(route.params.base_price_id.toString()),
}
</script>

<template>
  <forms-data-table :title="`${$getTranslation('shared.labels.list')} ${$getTranslation('shared.columns.stock')}`" :columns="tableColumn.itemStocksTableBySellPrice" :module="`items/${route.params.item_id}/base-prices/${route.params.base_price_id}/stocks`" :has-create-button="false" />

  <!-- <forms-data-table-indexdb :title="`${$getTranslation('shared.labels.list')} ${$getTranslation('shared.columns.stock')}`" :columns="tableColumn.itemStocksTableBySellPrice" module="stocks" :uri-detail="`items/${route.params.item_id}/base-prices/${route.params.base_price_id}/stocks`" :params="params" :has-create-button="false" /> -->
</template>
