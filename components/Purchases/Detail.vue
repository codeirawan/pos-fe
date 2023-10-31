<script setup lang="ts">
const module = 'purchases'
const purchase = usePurchaseStore()
const account = useAccountStore()
const tableColumn = useTableColumn()
const route = useRoute()
const rule = useRule()


onMounted(() => {
  account.getAll()
})
onNuxtReady(() => {
  purchase.getDetail()
})

function purchaseId() {
  return route.params.purchase_id
}

async function addPayment() {
  await purchase.submitPurchasePayment()
  await purchasePaymentsTable.value.reload()
}

const purchaseReceiveItemDialog = ref()
const purchaseItemsTable = ref()
const purchasePaymentsTable = ref()

function openPurchaseReceiveItemDialog(row: any) {
  purchaseReceiveItemDialog.value.openDialog(row)
}

function reloadPurchaseItemsTable() {
  purchaseItemsTable.value.reload()
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceNumber') }}</b>: {{ purchase.purchase.invoice_number }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.paymentStatus') }}</b>: {{ purchase.purchase.payment_status }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.deliveryStatus') }}</b>: {{ purchase.purchase.delivery_status }}
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.invoiceDate') }}</b>: {{ $formatDate(purchase.purchase.invoice_date, 'date') }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.taxInvoiceNumber') }}</b>: {{ purchase.purchase.tax_invoice_number }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.dueDate') }}</b>: {{ $formatDate(purchase.purchase.due_date, 'date') }}
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.reportDate') }}</b>: {{ $formatDate(purchase.purchase.report_date, 'date') }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.supplier') }}</b>: {{ purchase.purchase.supplier_name }}
    </div>
    <div class="col-12 col-md-4">
      <b>{{ $getTranslation('shared.columns.receiveDate') }}</b>: {{ $formatDate(purchase.purchase.receive_date, 'date') }}
    </div>
  </div>
  <p><b>{{ $getTranslation('shared.columns.description') }}</b>: {{ purchase.purchase.description }}</p>
  <div class="mt-5">
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.purchaseItemsTable" :module="`purchases/${purchaseId()}/items`" :hasCreateButton="false" @customButtonClick="openPurchaseReceiveItemDialog" ref="purchaseItemsTable"></forms-data-table>

    <!-- Receive Item -->
    <purchases-receive-item-dialog ref="purchaseReceiveItemDialog" @success="reloadPurchaseItemsTable()" />
  </div>
  <div class="mt-5">
    <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.buttons.payment')" :columns="tableColumn.purchasePaymentsTable" :module="`purchases/${purchaseId()}/payments`" :hasCreateButton="false" ref="purchasePaymentsTable"></forms-data-table>
  </div>
  <div class="mt-5 mx-0 text-right">
    <p><b>{{ $getTranslation('shared.labels.totalPrice') + ' (' + $getTranslation('shared.labels.afterTax') + ')' }}</b>:
      {{ $formatPrice(purchase.purchase.invoice_amount) }}</p>
    <p><b>{{ $getTranslation('shared.labels.tax') + ' (' + purchase.purchase.tax_percentage + '%)' }}</b>: {{
      $formatPrice(purchase.purchase.tax_amount) }}</p>
    <p><b>{{ $getTranslation('shared.columns.discountAmount') }}</b>: {{
      $formatPrice(purchase.purchase.discount_value) }}</p>
    <p><b>{{ $getTranslation('shared.columns.paidAmount') }}</b>:
      {{ $formatPrice(purchase.purchase.paid_amount) }}</p>
    <p><b>{{ $getTranslation('shared.columns.outstandingAmount') }}</b>:
      {{ $formatPrice(purchase.purchase.invoice_amount > 0 ? purchase.purchase.invoice_amount - (purchase.purchase.paid_amount ?? 0) : 0) }}</p>
    <p><b>{{ $getTranslation('shared.columns.status') }}</b>: {{
      (purchase.purchase.invoice_amount - (purchase.purchase.paid_amount ?? 0)) == 0 ? $getTranslation('shared.labels.settled') : $getTranslation('shared.labels.outstanding') }}</p>
    <hr class="my-3">
    <div class="mb-4 ml-3" v-if="purchase.purchase.outstanding_amount > 0">
      <q-form @submit="addPayment" @reset="purchase.resetForm" class="q-gutter-md">
        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.paymentAccount')" v-model="purchase.purchaseForm.account_id" :options="account.accounts" />
        <forms-input :required="true" :rules="[rule.required, rule.nonNegativeNumber, (val:number) => rule.max(val, purchase.purchase.outstanding_amount)]" :label="$getTranslation('shared.columns.paidAmount')" v-model="purchase.purchaseForm.paid_amount" type="number" />
        <forms-action-button :loading="purchase.loading" />
      </q-form>
    </div>
  </div>
</template>