<script setup lang="ts">
const module = 'stores'
const store = useStoreStore()
const rule = useRule()

onNuxtReady(() => {
  store.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="store.submitForm" @reset="store.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="store.storeForm.name" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-input v-model="store.storeForm.invoice_prefix" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.invoicePrefix')" />
      <forms-input v-model="store.storeForm.tax_percentage" type="number" :required="true" :rules="[rule.required, rule.nonNegativeNumber]" :label="$getTranslation('shared.columns.tax') + ' (%)'" />
      <forms-toggle v-model="store.storeForm.sale_lower_price_permission" :label="$getTranslation('shared.columns.saleLowerPricePermission')" />
      <forms-input v-model="store.storeForm.whatsapp_number" :label="$getTranslation('shared.columns.whatsappNumber')" />
      <forms-toggle v-model="store.storeForm.is_whatsapp_group" :rules="[rule.positiveNumber]" :label="$getTranslation('shared.columns.isWhatsappGroup')" />
      <forms-input type="textarea" class="mt-5" :label="$getTranslation('shared.columns.address')" v-model="store.storeForm.address" :required="true" :rules="[rule.required]" />
      <forms-action-button :loading="store.loading" />
    </q-form>
  </div>
</template>
