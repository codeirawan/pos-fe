<script setup lang="ts">
const item = useItemStore()
const tableColumn = useTableColumn()
const dialog = ref(false)
const route = useRoute()

</script>
<template>
  <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.purchasePrice')" :columns="tableColumn.itemBasePricesTable" :module="`items/${route.params.item_id}/base-prices`" :params="`&item_id=${route.params.item_id}`"></forms-data-table>

  <!-- Search Item Dialog -->
  <q-dialog v-model="dialog">
    <q-card class="search-item-dialog">
      <q-card-section class="row items-center">
        <forms-table-select :rows="item.items" :columns="tableColumn.itemsTable" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.search-item-dialog {
  width: auto !important;
  max-width: 100% !important;
}
</style>