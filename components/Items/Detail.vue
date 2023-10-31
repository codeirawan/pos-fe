<script setup lang="ts">
import VueBarcode from '@chenfengyuan/vue-barcode'

const module = 'items'
const item = useItemStore()
onNuxtReady(() => {
  item.getDetail()
  
  // Temporary disabled indexedDB
  // item.getDetailIndexdb()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="item.item.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="item.item.name" />
    <forms-label :label="$getTranslation('shared.columns.code')" :value="item.item.code" />
    <forms-label :label="$getTranslation('shared.columns.barcode')" :value="item.item.barcode" />
    <VueBarcode :value="item.itemForm.barcode" tag="svg" />
    <forms-label :label="$getTranslation('shared.columns.unit')" :value="item.item.unit_name" />
    <forms-label :label="$getTranslation('shared.columns.supplier')" :value="item.item.supplier_name" />
    <forms-label :label="$getTranslation('shared.columns.subCategory')" :value="item.item.sub_category_name" />
    <forms-label :label="$getTranslation('shared.columns.category')" :value="item.item.category_name" />
    <br/>
    <item-base-prices-table />
    <br/>
    <item-units-table />

  </div>
</template>
