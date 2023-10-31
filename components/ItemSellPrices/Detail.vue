<script setup lang="ts">
const module = 'items'
const nuxt = useNuxtApp()
const db = nuxt.$dexie
const route = useRoute()
const id = route.params.sell_price_id.toString()
//const itemSellPrice = await db.sellPrices.get(parseInt(id))

const itemSellPrice = useItemSellPriceStore()
onNuxtReady(() => {
  itemSellPrice.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"  module2="base-prices" :title2="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.purchasePrice')" module3="sell-prices" :title3="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.sellPrice')" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="itemSellPrice.itemSellPrice.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.profit')" :value="itemSellPrice.itemSellPrice.profit" />
    <forms-label :label="$getTranslation('shared.columns.sellPrice')" :value="itemSellPrice.itemSellPrice.sell_price" />
    <forms-label :label="$getTranslation('shared.columns.defaultPrice')" :value="itemSellPrice.itemSellPrice.default_price" />

  </div>
</template>
