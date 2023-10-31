<script setup lang="ts">
const module = 'sale-returns'
const tableColumn = useTableColumn()
const rule = useRule()
const filter = ref('')
const saleReturn = useSaleReturnStore()

onNuxtReady(() => {
  saleReturn.getDetail()
  saleReturn.getDetailItems()
})

function calculateDiscount(index: number) {
  let item = saleReturn.Form.items[index]
  saleReturn.Form.items[index].received_quantity = item.received_quantity_old - item.returned_quantity
  item = saleReturn.Form.items[index]
  const price = (item.quantity - item.returned_quantity) * item.sell_price
  const priceReturn = item.returned_quantity * item.sell_price
  saleReturn.Form.items[index].discount_value = ((item.discount_percentage || 0) / 100) * price
  const discountValueReturn = ((item.discount_percentage || 0) / 100) * priceReturn
  saleReturn.Form.items[index].total_price = price - (saleReturn.Form.items[index].discount_value ?? 0)
  saleReturn.Form.items[index].total_return_amount = priceReturn - discountValueReturn
  let totalPrice = 0
  saleReturn.Form.items.map((item: any) => {
    totalPrice += item.total_price
  })
  saleReturn.Form.invoice_amount = totalPrice
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceNumber') }}</b>: {{ saleReturn.Form.invoice_number }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.status') }}</b>: {{ saleReturn.Form.status }}
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.pic') }}</b>: {{ saleReturn.Form.pic }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceDate') }}</b>: {{ $formatDate(saleReturn.Form.created_at) }}
    </div>
  </div>
  <q-form @submit="saleReturn.submitForm" @reset="saleReturn.resetForm" @validation-error="$formValidationError" class="q-gutter-md">
    <div>
      <q-table
      class="mt-8 purchase-item"
      bordered dense
      :rows="saleReturn.Form.items"
      :columns="tableColumn.saleReturnItemsTable"
      row-key="name"
      :filter="filter"
      :no-results-label="$getTranslation('shared.labels.noSearchResut')">
        <template v-slot:top>
          <div class="box-title-table"><span class="title-table">{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') + ' ' + $getTranslation('modules.sales.title') }}</span></div>
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
      <forms-input type="textarea" :rules="[rule.required]" class="mt-5" :label="$getTranslation('shared.columns.description')" v-model="saleReturn.Form.description" />
    </div>
    <div class="mt-5 mx-0 text-right">
      <p><b>{{ $getTranslation('shared.columns.invoiceAmount') + ' (' + $getTranslation('shared.labels.afterTax') + ')'
      }}</b>:
        {{ $formatPrice(saleReturn.Form.invoice_amount) }}</p>
    </div>
    <forms-action-button :loading="saleReturn.loading" />
  </q-form>
</template>