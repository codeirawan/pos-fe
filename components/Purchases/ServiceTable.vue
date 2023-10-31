<script setup lang="ts">
import IItem from '~/interfaces/Items/IItem'
import IPurchaseFormItem from '~/interfaces/Purchases/IPurchaseFormItem'
const item = useItemStore()
const tableColumn = useTableColumn()
const filter = ref('')
const dialog = ref(false)
const purchase = usePurchaseStore()

function itemAdd(item: IItem) {
  purchase.addItem({
    item_id: item.id,
    item_name: item.name,
    item_code: item.code,
    unit_name: item.unit_name ?? '',
    price: null,
    quantity: null,
    item_base_price_id: 0
  })
  dialog.value = !dialog.value
}

function removeItem(item: IPurchaseFormItem) {
  purchase.removeItem(item)
}

export interface IPurchaseItemTable {
  hasAddButton: boolean
  items: IPurchaseFormItem[]
}

withDefaults(defineProps<IPurchaseItemTable>(), {
  hasAddButton: true
})

</script>
<template>
  <q-table bordered class="mx-0" dense :rows="items" :columns="tableColumn.purchaseFormItemsTable" row-key="name"
    :filter="filter" :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <b>{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') }}</b>
      <q-space />
      <q-btn v-if="hasAddButton" color="primary" @click="dialog = !dialog" :label="$getTranslation('shared.buttons.add')" />
    </template>
    <template v-slot:body-cell-price="props" v-if="hasAddButton">
      <q-td :props="props">
        <forms-input v-model="items[props.rowIndex].price"
          type="number" />
      </q-td>
    </template>
    <template v-slot:body-cell-quantity="props" v-if="hasAddButton">
      <q-td :props="props">
        <forms-input v-model="items[props.rowIndex].quantity"
          type="number" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="negative" icon="delete" @click="removeItem(props.row)"></q-btn>
      </q-td>
    </template>
  </q-table>

  <!-- Search Item Dialog -->
  <q-dialog v-model="dialog">
    <q-card class="search-item-dialog">
      <q-card-section class="row items-center">
        <forms-table-select :rows="item.items" :columns="tableColumn.itemsTable"
          @addButton="itemAdd" />
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