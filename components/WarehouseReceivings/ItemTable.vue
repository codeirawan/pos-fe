<script setup lang="ts">
import IItem from '~/interfaces/Items/IItem'
import IWarehouseReceivingFormItem from '~/interfaces/WarehouseReceivings/IWarehouseReceivingFormItem'
const tableColumn = useTableColumn()
const filter = ref('')
const dialog = ref(false)
const warehouseReceiving = useWarehouseReceivingStore()
const item = useItemStore()
const rule = useRule()

async function itemAdd(itemParam: IItem) {
  warehouseReceiving.addItem(itemParam)
  item.removeItem(itemParam)
  dialog.value = !dialog.value
}

function setSelectedUnitName(item: IWarehouseReceivingFormItem) {
  const itemUnit = item.item_units.find(n => n.item_id == item.item_id && n.unit_id == item.selected_unit_id)
  if (itemUnit) {
    item.selected_unit_name = itemUnit.name
    item.quantity = itemUnit.quantity
    item.selected_base_quantity = itemUnit.quantity
  }

  calculateTotalQuantity(item)
}

function calculateTotalQuantity(item: IWarehouseReceivingFormItem) {
  item.quantity = (item.selected_quantity ?? 0) * (item.selected_base_quantity ?? 0) || (item.selected_base_quantity ?? 0)
}

function removeItem(itemParam: IWarehouseReceivingFormItem) {
  warehouseReceiving.removeItem(itemParam)
  item.addItem(itemParam.item_id)
}

export interface IWarehouseReceivingItemTable {
  items: IItem[]
}

withDefaults(defineProps<IWarehouseReceivingItemTable>(), {})

</script>
<template>
  <q-table bordered class="mx-0" dense :rows="warehouseReceiving.warehouseReceivingForm.items" :columns="tableColumn.warehouseReceivingFormItemsTable" row-key="name"
    :filter="filter" :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <div class="box-title-table"><span class="title-table">{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') }}</span></div>
      <q-space />
      <q-btn v-if="warehouseReceiving.warehouseReceivingForm.supplier_id" color="primary" @click="dialog = !dialog" :label="$getTranslation('shared.buttons.add')" />
    </template>
    <template v-slot:body-cell-unit_name="props">
      <q-td :props="props">
        <forms-select ref="selectUnit" :label="props.row.selected_unit_id && props.row.unit_id != props.row.selected_unit_id ? parseInt(props.row.quantity) + ' ' + props.row.unit_name : ''" v-model="props.row.selected_unit_id" :options="props.row.item_units" optionValue="unit_id" :rules="[rule.required]" @update:model-value="setSelectedUnitName(props.row)"/>
      </q-td>
    </template>
    <template v-slot:body-cell-quantity="props">
      <q-td :props="props">
        <forms-input :required="true" :rules="[rule.required]" v-model="props.row.selected_quantity"
          type="number" @keyup="calculateTotalQuantity(props.row)" @change="calculateTotalQuantity(props.row)"/>
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
        <forms-table-select :rows="items" :columns="tableColumn.supplierItemsTable" @addButton="itemAdd" :loading="warehouseReceiving.loading" />
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