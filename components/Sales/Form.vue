<script setup lang="ts">
const module = 'sales'
const sale = useSaleStore()
const customer = useCustomerStore()
const account = useAccountStore()
const rule = useRule()

onMounted(() => {
  customer.getAll()
  account.getAll()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <q-form @submit="sale.submitForm" @reset="sale.resetForm" @validation-error="$formValidationError">
    <forms-select class="mb-5" :label="$getTranslation('shared.columns.customer')" v-model="sale.saleForm.customer_id" :options="customer.customers" :autofocus="true" v-if="!customer.loading" />
    <forms-input class="mb-5" :label="$getTranslation('shared.columns.policeNumber')" v-model="sale.saleForm.police_number" />
    <sales-item-table />

    <forms-toggle class="mt-5" :label="$getTranslation('shared.labels.addPayment')" v-model="sale.saleForm.add_payment"></forms-toggle>
    <div class="ma-0" v-if="sale.saleForm.add_payment">
      <p class="mx-0 mt-3"><b>{{ $getTranslation('shared.labels.paymentMethod') }}</b></p>
      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.account')" v-model="sale.saleForm.account_id" :options="account.accounts" />
      <forms-input :required="true" :rules="[rule.required, rule.nonNegativeNumber, (val: number) => rule.max(val, sale.getTotalItemPrice)]" :label="$getTranslation('shared.columns.paidAmount')" v-model="sale.saleForm.paid_amount" type="number" />
    </div>
    <div class="mx-0 text-right">
      <p><b>{{ $getTranslation('shared.labels.totalPrice') + ' (' + $getTranslation('shared.labels.afterTax') + ')' }}</b>:
        {{ $formatPrice(sale.getTotalItemPrice) }}</p>
      <p><b>{{ $getTranslation('shared.labels.tax') + ' (' + $taxPercentage() + '%)' }}</b>: {{
        $formatPrice(sale.getTotalTax) }}</p>
      <p><b>{{ $getTranslation('shared.columns.discountAmount') }}</b>: {{
        $formatPrice(sale.getDiscountValue) }}</p>
      <p><b>{{ $getTranslation('shared.columns.paidAmount') }}</b>:
        {{ $formatPrice(sale.getTotalSaleFormPaidAmount) }}</p>
      <p><b>{{ $getTranslation('shared.columns.outstandingAmount') }}</b>:
        {{ $formatPrice(sale.getTotalItemPrice > 0 ? sale.getTotalItemPrice - (sale.saleForm.paid_amount ?? 0) : 0) }}</p>
      <p><b>{{ $getTranslation('shared.columns.status') }}</b>: {{
        sale.getTotalOutstandingAmount <= 0 ? $getTranslation('shared.labels.settled') : $getTranslation('shared.labels.outstanding') }}</p>
      <hr class="my-3">
    </div>
    <forms-action-button :disabled="sale.saleForm.items?.length === 0" :loading="sale.loading" />
  </q-form>
</template>