<script setup lang="ts">
const module = 'sale-returns'
const tableColumn = useTableColumn()
const filter = ref('')
const saleReturn = useSaleReturnStore()

onNuxtReady(() => {
  saleReturn.getDetail()
  saleReturn.getDetailItems()
})
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
  <div>
    <q-table class="mt-8 purchase-item" bordered dense :rows="saleReturn.Form.items"
      :columns="tableColumn.saleReturnItemsTable" row-key="name" :filter="filter"
      :no-results-label="$getTranslation('shared.labels.noSearchResut')">
      <template v-slot:top>
        <div class="box-title-table"><span class="title-table">{{ $getTranslation('shared.labels.list') + ' ' +
          $getTranslation('shared.columns.item') + ' ' + $getTranslation('modules.sales.title') }}</span></div>
        <q-space />
        <q-input filled borderless dense debounce="300" v-model="filter"
          :placeholder="$getTranslation('shared.inputs.search')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <forms-input type="textarea" :readonly="true" class="mt-5"
      :label="$getTranslation('shared.columns.description')" v-model="saleReturn.Form.description" />
  </div>
  <div class="mt-5 mx-0 text-right">
    <p><b>{{ $getTranslation('shared.columns.invoiceAmount') + ' (' + $getTranslation('shared.labels.afterTax') + ')'
    }}</b>:
      {{ $formatPrice(saleReturn.Form.invoice_amount) }}</p>
  </div>
</template>