<script setup lang="ts">
const module = 'warehouse-receivings'
const warehouseReceiving = useWarehouseReceivingStore()
const tableColumn = useTableColumn()
const route = useRoute()

onNuxtReady(() => {
  warehouseReceiving.getDetail()
})

function warehouseReceivingId() {
  return route.params.warehouse_receiving_id
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.date') }}</b>: {{ $formatDate(warehouseReceiving.warehouseReceiving.created_at, 'date') }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.supplier') }}</b>: {{ warehouseReceiving.warehouseReceiving.supplier_name }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.warehouse') }}</b>: {{ warehouseReceiving.warehouseReceiving.warehouse_name }}
    </div>
  </div>
  <div class="mt-5">
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.warehouseReceivingItemsTable" :module="`warehouse-receivings/${warehouseReceivingId()}/items`" :hasCreateButton="false" :withWarehouseId="true" />
  </div>
</template>