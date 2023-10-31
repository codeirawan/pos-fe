<script setup lang="ts">
const module = 'purchase-returns'
const tableColumn = useTableColumn()
const rule = useRule()
const filter = ref('')
const purchaseReturn = usePurchaseReturnStore()

onNuxtReady(() => {
  purchaseReturn.getDetail()
  purchaseReturn.getDetailItems()
})

function calculateDiscount(index: number) {
  let item = purchaseReturn.Form.items[index]
  purchaseReturn.Form.items[index].received_quantity = item.received_quantity_old - item.returned_quantity
  item = purchaseReturn.Form.items[index]
  purchaseReturn.Form.items[index].total_price = (item.quantity - item.returned_quantity) * item.price
  purchaseReturn.Form.items[index].total_return_amount = item.returned_quantity * item.price
  let totalPrice = 0
  purchaseReturn.Form.items.map((item: any) => {
    totalPrice += item.total_price
  })
  purchaseReturn.Form.invoice_amount = totalPrice
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceNumber') }}</b>: {{ purchaseReturn.Form.invoice_number }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.status') }}</b>: {{ purchaseReturn.Form.status }}
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.pic') }}</b>: {{ purchaseReturn.Form.pic }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceDate') }}</b>: {{ $formatDate(purchaseReturn.Form.created_at) }}
    </div>
  </div>
  <q-form @submit="purchaseReturn.submitForm" @reset="purchaseReturn.resetForm" @validation-error="$formValidationError" class="q-gutter-md">
    <div>
      <q-table
      class="mt-8 purchase-item"
      bordered dense
      :rows="purchaseReturn.Form.items"
      :columns="tableColumn.purchaseReturnItemsTable"
      row-key="name"
      :filter="filter"
      :no-results-label="$getTranslation('shared.labels.noSearchResut')">
        <template v-slot:top>
          <div class="box-title-table"><span class="title-table">{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') + ' ' + $getTranslation('modules.purchases.title') }}</span></div>
          <q-space />
          <q-input filled borderless dense debounce="300" v-model="filter"
            :placeholder="$getTranslation('shared.inputs.search')">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-returned_quantity="props">
          <q-td :props="props" style="max-width: 70px">
            <q-input class="pb-0" type="number" dense filled :rules="[rule.nonNegativeNumber, (val: number) => rule.maxQuantity(val, parseInt(props.row.received_quantity_old))]" v-model="props.row.returned_quantity" @change="calculateDiscount(props.rowIndex)" />
          </q-td>
        </template>
      </q-table>
      <forms-input type="textarea" :rules="[rule.required]" class="mt-5" :label="$getTranslation('shared.columns.description')" v-model="purchaseReturn.Form.description" />
    </div>
    <div class="mt-5 mx-0 text-right">
      <p><b>{{ $getTranslation('shared.columns.invoiceAmount') + ' (' + $getTranslation('shared.labels.afterTax') + ')'
      }}</b>:
        {{ $formatPrice(purchaseReturn.Form.invoice_amount) }}</p>
    </div>
    <forms-action-button :loading="purchaseReturn.loading" />
  </q-form>
</template>