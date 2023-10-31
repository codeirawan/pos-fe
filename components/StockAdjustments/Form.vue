<script setup lang="ts">
const tableColumn = useTableColumn()
const stockAdjustmentTable = ref()
const stockAdjustmentItemPopup = ref()

function openStockAdjustmentItemPopup(row: any) {
  stockAdjustmentItemPopup.value.openDialog(row)
}

function reloadStockAdjustmentTable() {
  stockAdjustmentTable.value.reload()
}
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.stockAdjustmentsFormTable" module="item-stocks/base-prices" :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation(`modules.items.title`)" :hasEditButton="false" :hasCreateButton="false" :hasDeleteButton="false" ref="stockAdjustmentTable"  @customButtonClick="openStockAdjustmentItemPopup" />

    <!-- Transfer Stock -->
    <stock-adjustments-item-dialog ref="stockAdjustmentItemPopup" @success="reloadStockAdjustmentTable()" />
  </div>
</template>
