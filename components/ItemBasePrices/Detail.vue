<script setup lang="ts">
const module = 'items'
const nuxt = useNuxtApp()
const db = nuxt.$dexie
const route = useRoute()
const id = route.params.base_price_id.toString()
//const itemBasePrice = await db.basePrices.get(parseInt(id))
// const prize = itemBasePrice.purchase_price?.toString()
// const cost = itemBasePrice.cost?.toString()

const itemBasePrice = useItemBasePriceStore()
onNuxtReady(() => {
  itemBasePrice.getDetail()
})
</script>
<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"  module2="base-prices" :title2="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.purchasePrice')" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="itemBasePrice.itemBasePrice.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.purchasePrice')" :value="itemBasePrice.itemBasePrice.purchase_price?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.cost')" :value="itemBasePrice.itemBasePrice.cost?.toString()" />
    <item-sell-prices-table></item-sell-prices-table>
    <div class="mt-8">
      <item-stocks-table />
    </div>
  </div>
</template>
