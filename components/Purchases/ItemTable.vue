<script setup lang="ts">
import IItem from '~/interfaces/Items/IItem'
import IPurchaseFormItem from '~/interfaces/Purchases/IPurchaseFormItem'
const tableColumn = useTableColumn()
const filter = ref('')
const dialog = ref(false)
const historyItemDialog = ref(false)
const purchase = usePurchaseStore()
const basePrice = useItemBasePriceStore()
const item = useItemStore()
const rule = useRule()
const nuxt = useNuxtApp()

async function itemAdd(itemParam: IItem) {
  purchase.addItem(itemParam)
  item.removeItem(itemParam)
  dialog.value = !dialog.value
}

function setSelectedUnitName(item: IPurchaseFormItem, rowIndex: number) {
  const itemUnit = item.item_units?.find(n => n.item_id == item.item_id && n.unit_id == item.selected_unit_id)
  if (itemUnit) {
    item.selected_unit_name = itemUnit.name
    item.quantity = itemUnit.quantity
    item.selected_base_quantity = itemUnit.quantity
  }

  calculateDiscount('percentage', rowIndex)
}

function calculateDiscount(type: string, index: number) {
  let item = purchase.purchaseForm.items[index]
  purchase.purchaseForm.items[index].quantity = (item.selected_quantity ?? 0) * (item.selected_base_quantity ?? 0) || (item.selected_base_quantity ?? 0)
  item = purchase.purchaseForm.items[index]
  const price = (item.quantity || 0)  * (item.price || 0)
  if (type == 'value') {
    purchase.purchaseForm.items[index].discount_percentage = 100 / (price / (item.discount_value ?? 0))
  } else {
    if (item.discount_percentage) {
      purchase.purchaseForm.items[index].discount_value = (item.discount_percentage / 100) * price
    } else {
      purchase.purchaseForm.items[index].discount_value = null
    }
  }

  if (purchase.purchaseForm.include_tax) {
    purchase.purchaseForm.items[index].total_price = price - (purchase.purchaseForm.items[index].discount_value ?? 0)
    purchase.purchaseForm.items[index].tax = (purchase.purchaseForm.items[index].total_price ?? 0) / (1 + parseInt(nuxt.$taxPercentage()))
    purchase.purchaseForm.items[index].sub_total_price = (purchase.purchaseForm.items[index].total_price ?? 0) - purchase.purchaseForm.items[index].tax
  } else {
    purchase.purchaseForm.items[index].sub_total_price = price - (purchase.purchaseForm.items[index].discount_value ?? 0)
    purchase.purchaseForm.items[index].tax = purchase.purchaseForm.items[index].sub_total_price * nuxt.$taxPercentage() / 100
    purchase.purchaseForm.items[index].total_price = purchase.purchaseForm.items[index].sub_total_price + purchase.purchaseForm.items[index].tax
  }
}

function calculateAll() {
  purchase.purchaseForm.items.map((item: any) => {
    item.quantity = (item.selected_quantity ?? 0) * (item.selected_base_quantity ?? 0) || (item.selected_base_quantity ?? 0)
    item = item
    const price = (item.quantity || 0) * (item.price || 0)
    if (item.discount_percentage) {
      item.discount_value = (item.discount_percentage / 100) * price
    } else {
      item.discount_value = null
    }

    if (purchase.purchaseForm.include_tax) {
      item.total_price = price - (item.discount_value ?? 0)
      item.tax = (item.total_price ?? 0) / (1 + parseInt(nuxt.$taxPercentage()))
      item.sub_total_price = (item.total_price ?? 0) - item.tax
    } else {
      item.sub_total_price = price - (item.discount_value ?? 0)
      item.tax = item.sub_total_price * nuxt.$taxPercentage() / 100
      item.total_price = item.sub_total_price + item.tax
    }
  })
}

function removeItem(itemParam: IPurchaseFormItem) {
  purchase.removeItem(itemParam)
  item.addItem(itemParam.item_id)
}

export interface IPurchaseItemTable {
  items: IItem[]
  purchaseItems: IPurchaseFormItem[]
}

withDefaults(defineProps<IPurchaseItemTable>(), {})

function showHistoryItem(item_id: number) {
  purchase.purchaseForm.item_id_history = item_id
  historyItemDialog.value = true
}
</script>
<template>
  <q-table bordered class="mx-0" dense :rows="purchaseItems" :columns="tableColumn.purchaseFormItemsTable" row-key="name"
    :filter="filter" :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <b>{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') }}</b>
      <forms-toggle class="ml-1" :marginBottom="false" v-model="purchase.purchaseForm.include_tax" @click="calculateAll()" :label="$getTranslation('shared.labels.includeTax')" />
      <q-space />
      <q-btn color="primary" @click="dialog = !dialog" :label="$getTranslation('shared.buttons.add')" />
    </template>
    <template v-slot:body-cell-item_base_price_id="props">
      <q-td :props="props">
        <forms-select
          :label="''"
          :clearable="false"
          v-model="props.row.item_base_price_id"
          optionLabel="purchase_price"
          :options="props.row.base_prices"
          :rules="[rule.required]"
          style="width: 150px" />
      </q-td>
    </template>
    <template v-slot:body-cell-price="props">
      <q-td :props="props">
        <forms-input :required="true" :rules="[rule.required, rule.nonNegativeNumber]" v-model="props.row.price"
          type="number" @keyup="calculateDiscount('percentage', props.rowIndex)" style="min-width: 120px" />
      </q-td>
    </template>
    <template v-slot:body-cell-unit_name="props">
      <q-td :props="props">
        <forms-select
          v-model="props.row.selected_unit_id"
          :ref="`selectUnit${props.rowIndex}`"
          :options="props.row.item_units"
          optionValue="unit_id"
          @update:model-value="setSelectedUnitName(props.row, props.rowIndex)"
          :rules="[rule.required]"
          :label="props.row.selected_unit_id && props.row.unit_id != props.row.selected_unit_id ? parseInt(props.row.quantity) + ' ' + props.row.unit_name : ''"
          :clearable="false"
          style="width: 112px" />
      </q-td>
    </template>
    <template v-slot:body-cell-quantity="props">
      <q-td :props="props">
        <forms-input :required="true" :rules="[rule.required]" v-model="props.row.selected_quantity"
          type="number" @keyup="calculateDiscount('percentage', props.rowIndex)" style="min-width: 80px" />
      </q-td>
    </template>
    <template v-slot:body-cell-discount_percentage="props">
      <q-td :props="props">
        <q-input type="number" step=".01" pattern="^\d*(\.\d{0,2})?$" dense filled :rules="[rule.nonNegativeNumber, (val: number) => rule.maxDiscount(val)]" v-model="props.row.discount_percentage" @keyup="calculateDiscount('percentage', props.rowIndex)" @change="calculateDiscount('percentage', props.rowIndex)" max="99" style="min-width: 110px" >
          <template v-slot:append>
            <q-icon name="percent" size="sm" />
          </template>
        </q-input>
      </q-td>
    </template>
    <template v-slot:body-cell-discount_value="props">
      <q-td :props="props">
        <q-input type="number" step=".01" pattern="^\d*(\.\d{0,2})?$" dense filled :rules="[rule.positiveNumber, (val: number) => rule.max(val, props.row.quantity * props.row.price)]" v-model="props.row.discount_value" @keyup="calculateDiscount('value', props.rowIndex)" @change="calculateDiscount('value', props.rowIndex)" style="min-width: 120px" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat icon="history" @click="showHistoryItem(props.row.item_id)">
          <q-tooltip>{{ $getTranslation('shared.buttons.history') }}</q-tooltip>
        </q-btn>
        <q-btn dense round flat color="negative" icon="delete" @click="removeItem(props.row)"></q-btn>
      </q-td>
    </template>
  </q-table>

  <!-- Search Item Dialog -->
  <q-dialog v-model="dialog">
    <q-card class="search-item-dialog">
      <q-card-section class="row items-center">
        <forms-table-select :rows="items" :columns="tableColumn.itemsTable"
          @addButton="itemAdd" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Search History Item Dialog -->
  <q-dialog v-model="historyItemDialog">
    <q-card class="search-item-dialog">
      <q-card-section class="row items-center">
        <forms-data-table :title="$getTranslation('shared.buttons.history') + ' ' + $getTranslation('modules.purchases.title') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.purchaseItemHistoriesTable" :module="`purchase-items/${purchase.purchaseForm.item_id_history}/supplier/${purchase.purchaseForm.supplier_id}`" :hasCreateButton="false" />
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