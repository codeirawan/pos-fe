<script setup lang="ts">
const module = 'purchases'
const purchase = usePurchaseStore()
const item = useItemStore()
const rule = useRule()
const supplier = useSupplierStore()
const warehouse = useWarehouseStore()
const account = useAccountStore()
const expedition = useExpeditionStore()

onMounted(() => {
  warehouse.getAll()
  supplier.getAll()
  account.getAll()
  expedition.getAll()
  item.getAll()
  if (!purchase.purchaseForm.invoice_date) {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    purchase.purchaseForm.invoice_date = year + '-' + month + '-' + day
  }
})

function dueDateOptions(date: string): boolean {
  return date >= purchase.purchaseForm.invoice_date
}

function filterItem(supplier_id: number) {
  purchase.filterItem(supplier_id)
  item.filterItem(supplier_id)
}
</script>

<template>
  <forms-breadcumb class="q-mr-md" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md">
    <q-form @submit="purchase.submitForm" @reset="purchase.resetForm" @validation-error="$formValidationError" class="q-gutter-md mb-10">
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.invoiceNumber')" v-model="purchase.purchaseForm.invoice_number" :autofocus="true"/>
      <forms-input class="mb-5" :label="$getTranslation('shared.columns.taxInvoiceNumber')" v-model="purchase.purchaseForm.tax_invoice_number" />
      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.warehouse')" v-model="purchase.purchaseForm.warehouse_id" :options="warehouse.warehouses" v-if="!warehouse.loading" />
      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.supplier')" v-model="purchase.purchaseForm.supplier_id" :options="supplier.suppliers" @update:model-value="filterItem(purchase.purchaseForm.supplier_id)" v-if="!supplier.loading" />
      <forms-date-picker :required="true" :rules="[rule.required, rule.date]" :label="$getTranslation('shared.columns.invoiceDate')" v-model="purchase.purchaseForm.invoice_date" />
      <forms-date-picker :required="true" :rules="[rule.required, rule.date]" :label="$getTranslation('shared.columns.dueDate')" v-model="purchase.purchaseForm.due_date" :options="dueDateOptions" />
      <forms-date-picker :rules="[rule.date]" :label="$getTranslation('shared.columns.reportDate')" v-model="purchase.purchaseForm.report_date" />
      <forms-date-picker :required="true" :rules="[rule.required, rule.date]" :label="$getTranslation('shared.columns.receiveDate')" v-model="purchase.purchaseForm.receive_date" />
      <forms-input autogrow type="textarea"  :label="$getTranslation('shared.columns.description')" v-model="purchase.purchaseForm.description" />
      <purchases-item-table v-if="purchase.purchaseForm.supplier_id" :items="item.items"  :purchaseItems="purchase.purchaseForm.items" />
      <forms-toggle class="d-block mt-5" :label="$getTranslation('shared.labels.addExpedition')" v-model="purchase.purchaseForm.add_expedition"></forms-toggle>
      <div class="ma-0" v-if="purchase.purchaseForm.add_expedition">
        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.expedition')" v-model="purchase.purchaseForm.expedition_id" :options="expedition.expeditions" />
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.shippingPrice')" v-model="purchase.purchaseForm.shipping_price" type="number" />
      </div>
      <hr class="ma-0">
      <forms-toggle class="mt-5" :label="$getTranslation('shared.labels.addPayment')" v-model="purchase.purchaseForm.add_payment"></forms-toggle>
      <div class="ma-0" v-if="purchase.purchaseForm.add_payment">
        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.paymentAccount')" v-model="purchase.purchaseForm.account_id" :options="account.accounts" />
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber, (val: number) => rule.max(val, purchase.getTotalItemPrice ?? 0)]" :label="$getTranslation('shared.columns.paidAmount')" v-model="purchase.purchaseForm.paid_amount" type="number" />
      </div>
      <div class="mx-0 text-right">
        <p v-if="purchase.purchaseForm.add_expedition"><b>{{ $getTranslation('shared.columns.serviceAmount') }}</b>:
          {{ $formatPrice(purchase.purchaseForm.shipping_price ?? 0) }}</p>
        <p><b>{{ $getTranslation('shared.labels.totalPrice') + ' (' + $getTranslation('shared.labels.afterTax') + ')' }}</b>:
          {{ $formatPrice(purchase.getTotalItemPrice) }}</p>
        <p><b>{{ $getTranslation('shared.labels.tax') + ' (' + $taxPercentage() + '%)' }}</b>: {{
          $formatPrice(purchase.getTotalTax) }}</p>
        <p><b>{{ $getTranslation('shared.columns.discountAmount') }}</b>: {{
          $formatPrice(purchase.getDiscountValue) }}</p>
        <p><b>{{ $getTranslation('shared.columns.paidAmount') }}</b>:
          {{ $formatPrice(purchase.getTotalFormPaidAmount) }}</p>
        <p><b>{{ $getTranslation('shared.columns.outstandingAmount') }}</b>:
          {{ $formatPrice((purchase.getTotalItemPrice > 0 ? purchase.getTotalItemPrice - (purchase.purchaseForm.paid_amount ?? 0) : 0)) }}</p>
        <p><b>{{ $getTranslation('shared.columns.status') }}</b>: {{
          (purchase.getTotalItemPrice - (purchase.purchaseForm.paid_amount ?? 0)) == 0 ? $getTranslation('shared.labels.settled') : $getTranslation('shared.labels.outstanding') }}</p>
        <hr class="mt-3">
      </div>
      <forms-action-button :loading="purchase.loading"/>
    </q-form>
  </div>
</template>