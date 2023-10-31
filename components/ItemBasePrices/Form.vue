<script setup lang="ts">
const module = 'items'
const rule = useRule()
const itemBasePrice = useItemBasePriceStore()

onNuxtReady(() => {
  itemBasePrice.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" module2="base-prices" :title2="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.purchasePrice')" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="itemBasePrice.submitForm" @reset="itemBasePrice.resetForm" class="q-gutter-md">
      <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.purchasePrice')"
        v-model="itemBasePrice.itemBasePriceForm.purchase_price" :autofocus="true" />
      <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.cost')"
        v-model="itemBasePrice.itemBasePriceForm.cost" />
      <forms-action-button :loading="itemBasePrice.loading" />
    </q-form>
  </div>
</template>