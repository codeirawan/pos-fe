<script setup lang="ts">
const module = 'admin-receivings'
const adminReceiving = useAdminReceivingStore()
const tableColumn = useTableColumn()
const route = useRoute()
const adminReceivingItemsTable = ref()
const adminReceivingItemPurchase = ref()

onNuxtReady(() => {
  adminReceiving.getDetail()
})

function adminReceivingId() {
  return route.params.admin_receiving_id
}

function openAdminReceivingItemPurchase(row: any) {
  adminReceivingItemPurchase.value.openDialog(row, adminReceiving.adminReceiving.warehouse_id)
}

function reloadAdminReceivingItemsTable() {
  adminReceivingItemsTable.value.reload()
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.date') }}</b>: {{ $formatDate(adminReceiving.adminReceiving.created_at, 'date') }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.supplier') }}</b>: {{ adminReceiving.adminReceiving.supplier_name }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.warehouse') }}</b>: {{ adminReceiving.adminReceiving.warehouse_name }}
    </div>
  </div>
  <div class="mt-5">
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.adminReceivingItemsTable" :module="`warehouse-receivings/${adminReceivingId()}/items`" :hasCreateButton="false" ref="adminReceivingItemsTable" @customButtonClick="openAdminReceivingItemPurchase" />

    <!-- Receive Item -->
    <admin-receivings-item-purchase ref="adminReceivingItemPurchase" @success="reloadAdminReceivingItemsTable()" />
  </div>
</template>