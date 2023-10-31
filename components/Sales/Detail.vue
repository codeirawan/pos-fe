<script setup lang="ts">
import { saleStatusCanceled } from '~/constants/sale';

const module = 'sales'
const sale = useSaleStore()
const account = useAccountStore()
const tableColumn = useTableColumn()
const route = useRoute()
const rule = useRule()

onMounted(() => {
  account.getAll()
})
onNuxtReady(() => {
  sale.getDetail()
})

function saleId() {
  return route.params.sale_id
}

async function addPayment() {
  await sale.submitPurchasePayment()
  await purchasePaymentsTable.value.reload()
}
const purchasePaymentsTable = ref()
const salesSendItemDialog = ref()
const saleItemsTable = ref()
function openSaleSendItemDialog(row: any) {
  salesSendItemDialog.value.openDialog(row)
}
function reloadSaleItemsTable() {
  saleItemsTable.value.reload()
}
function statusNotCanceled(): boolean {
  return sale.sale.status !== saleStatusCanceled
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceNumber') }}</b>: {{ sale.sale.invoice_number }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.paymentStatus') }}</b>: {{ sale.sale.payment_status }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.deliveryStatus') }}</b>: {{ sale.sale.delivery_status }}
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.customer') }}</b>: {{ sale.sale.customer_name ?? '-' }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceDate') }}</b>: {{ $formatDate(sale.sale.created_at) }}
    </div>
  </div>
  <q-btn v-if="statusNotCanceled()" color="primary" icon="print" label="Invoice" @click="sale.printSale(parseInt(saleId().toString()))" class="mr-2" />
  <q-btn v-if="statusNotCanceled()" color="primary" icon="print" label="Surat Jalan" @click="sale.printDeliveryOrder(parseInt(saleId().toString()))" />
  <div class="mt-5">
    <forms-data-table ref="saleItemsTable" :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.saleDetailItemsTable" :module="`sales/${saleId()}/items`" :hasCreateButton="false" @customButtonClick="openSaleSendItemDialog" :hasCancelButton="statusNotCanceled()" :hasCustomButton="statusNotCanceled()"></forms-data-table>

    <!-- Send Item -->
    <SalesSendItemDialog ref="salesSendItemDialog" @success="reloadSaleItemsTable()" />
  </div>
  <div class="mt-5">
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.buttons.payment')" :columns="tableColumn.purchasePaymentsTable" :module="`sales/${saleId()}/payments`" :hasCreateButton="false" ref="purchasePaymentsTable"></forms-data-table>
  </div>
  <div class="mt-5 mx-0 text-right">
    <p><b>{{ $getTranslation('shared.labels.totalPrice') + ' (' + $getTranslation('shared.labels.afterTax') + ')' }}</b>:
      {{ $formatPrice(sale.sale.invoice_amount) }}</p>
    <p><b>{{ $getTranslation('shared.labels.tax') + ' (' + sale.sale.tax_percentage + '%)' }}</b>: {{
      $formatPrice(sale.sale.tax_amount) }}</p>
    <p><b>{{ $getTranslation('shared.columns.discountAmount') }}</b>: {{
      $formatPrice(sale.sale.discount_value) }}</p>
    <p><b>{{ $getTranslation('shared.columns.paidAmount') }}</b>:
      {{ $formatPrice(sale.sale.paid_amount) }}</p>
    <p><b>{{ $getTranslation('shared.columns.outstandingAmount') }}</b>:
      {{ $formatPrice(sale.sale.invoice_amount > 0 ? sale.sale.invoice_amount - (sale.sale.paid_amount ?? 0) : 0) }}</p>
    <p><b>{{ $getTranslation('shared.columns.status') }}</b>: {{
      (sale.sale.invoice_amount - (sale.sale.paid_amount ?? 0)) == 0 ? $getTranslation('shared.labels.settled') : $getTranslation('shared.labels.outstanding') }}</p>
    <hr class="my-3">
    <div class="mb-4 ml-3" v-if="sale.sale.outstanding_amount > 0 && statusNotCanceled()">
      <q-form @submit="addPayment" @reset="sale.resetForm" class="q-gutter-md">

        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.paymentAccount')" v-model="sale.saleForm.account_id" :options="account.accounts" />

        <forms-input :required="true" :rules="[rule.required, rule.nonNegativeNumber, (val: number) => rule.max(val, sale.sale.outstanding_amount)]" :label="$getTranslation('shared.columns.paidAmount')" v-model="sale.saleForm.paid_amount" type="number" />

        <forms-action-button :loading="sale.loading" />
      </q-form>
    </div>
  </div>
</template>