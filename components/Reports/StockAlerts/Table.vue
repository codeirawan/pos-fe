<script setup lang="ts">
const module = 'stockAlert'
const tableColumn = useTableColumn()
const itemStock = useItemStockStore()
</script>

<template>  
  <q-btn class="mb-3" color="primary" @click="itemStock.notify" :loading="itemStock.loading" :label="$getTranslation('shared.buttons.notify')" />

  <forms-data-table :columns="tableColumn.itemStockAlerts" module="item-stocks/base-prices/stock-alerts" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasEditButton="false" :hasCreateButton="false" :hasDeleteButton="false" />
</template>
