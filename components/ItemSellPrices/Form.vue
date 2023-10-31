<script setup lang="ts">
const module = 'items'
const rule = useRule()
const itemSellPrice = useItemSellPriceStore()
const priceCategory = usePriceCategoryStore()

await priceCategory.getAll()

onNuxtReady(async () => {
  itemSellPrice.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"  module2="base-prices" :title2="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.purchasePrice')" module3="sell-prices" :title3="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.sellPrice')" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="itemSellPrice.submitForm" @reset="itemSellPrice.resetForm" class="q-gutter-md">
      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.priceCategory')"
        v-model="itemSellPrice.itemSellPriceForm.price_category_id" :options="priceCategory.priceCategories" :autofocus="true" />
      <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.purchasePrice')"
        v-model="itemSellPrice.itemSellPriceForm.profit" />
      <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.sellPrice')"
        v-model="itemSellPrice.itemSellPriceForm.sell_price" />
      <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.defaultPrice')"
        v-model="itemSellPrice.itemSellPriceForm.default_price" />
      <forms-action-button :loading="itemSellPrice.loading" />
    </q-form>
  </div>
</template>