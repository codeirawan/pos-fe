<script setup lang="ts">
import VueBarcode from '@chenfengyuan/vue-barcode'
const module = 'item-deliveries'
const itemDelivery = useItemDeliveryStore()
const tableColumn = useTableColumn()
const rule = useRule()
const filter = ref('')

onNuxtReady(() => {
  itemDelivery.getDetail()
  itemDelivery.getSaleitems()
})

const emit = defineEmits(['success'])
async function submit() {
  const response = await itemDelivery.submitDeliveryItem()
  if (response === true) {
    emit('success')
  }
}

function reset() {
  itemDelivery.saleForm.items.map((item: any) => {
    item.returned_quantity = null
  })
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceNumber') }}</b>: {{ itemDelivery.sale.invoice_number }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.deliveryStatus') }}</b>: {{ itemDelivery.sale.delivery_status }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.policeNumber') }}</b>: {{ itemDelivery.sale.police_number }}
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.customer') }}</b>: {{ itemDelivery.sale.customer_name ?? '-' }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceDate') }}</b>: {{ $formatDate(itemDelivery.sale.created_at) }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.pic') }}</b>: {{ itemDelivery.sale.delivered_by_name }}
    </div>
  </div>
  <div class="mt-5">
    <q-table bordered class="mx-0" dense :rows="itemDelivery.saleForm.items" :columns="tableColumn.itemDeliveryDetailItemsTable" row-key="name"
      :filter="filter" :no-data-label="$getTranslation('shared.labels.noData')"
      :no-results-label="$getTranslation('shared.labels.noSearchResut')">
      <template v-slot:top>
        <div class="box-title-table">
          <span class="title-table">{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') }}</span>
        </div>
        <q-space />
      </template>
      <template v-slot:body-cell-return_quantity="props">
        <q-td :props="props">
          <forms-input v-if="!itemDelivery.sale.delivered_by_name && !itemDelivery.sale.delivered_at" :required="true" :rules="[rule.nonNegativeNumber, (val: number) => rule.max(val, props.row.quantity)]" v-model="props.row.returned_quantity" type="number" style="width: 120px; margin: auto;" />
          <label v-else>{{ props.row.returned_quantity ?? 0 }}</label>
        </q-td>
      </template>
      <template v-slot:body-cell-barcode="props">
        <q-td :props="props">
          <VueBarcode :value="props.row.barcode" tag="svg" />
        </q-td>
      </template>
    </q-table>
    <hr>
    <div class="float-right mb-4 mt-4" v-if="!itemDelivery.sale.delivered_by_name && !itemDelivery.sale.delivered_at">
      <q-btn :label="$getTranslation('shared.buttons.submit')" color="positive" @click="submit()" :loading="itemDelivery.loading" />
      <q-btn :label="$getTranslation('shared.buttons.reset')" type="reset" color="secondary" flat class="q-ml-sm"  @click="reset()" />
    </div>
  </div>
</template>