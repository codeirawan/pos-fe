<script setup lang="ts">
const tableColumn = useTableColumn()
const warehouseStockTransfersTable = ref()
const warehouseStockTransfersItemPopup = ref()

function openWarehouseStockTransfersItemPopup(row: any) {
  warehouseStockTransfersItemPopup.value.openDialog(row)
}

function reloadWarehouseStockTransfersTable() {
  warehouseStockTransfersTable.value.reload()
}
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.warehouseStockTransfersFormTable" module="item-stocks/base-prices" :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation(`modules.items.title`)" :hasEditButton="false" :hasCreateButton="false" :hasDeleteButton="false" ref="warehouseStockTransfersTable"  @customButtonClick="openWarehouseStockTransfersItemPopup"/>

    <!-- Transfer Stock -->
    <warehouseStockTransfers-item-dialog ref="warehouseStockTransfersItemPopup" @success="reloadWarehouseStockTransfersTable()" />
  </div>
</template>
