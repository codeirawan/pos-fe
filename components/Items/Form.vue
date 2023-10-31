<script setup lang="ts">
import VueBarcode from '@chenfengyuan/vue-barcode'

const module = 'items'
const item = useItemStore()
const supplier = useSupplierStore()
const subCategory = useSubCategoryStore()
const unit = useUnitStore()
const rule = useRule()
const nuxt = useNuxtApp()

onMounted(() => {
  supplier.getAll()
  subCategory.getAll()
  unit.getAll()
})
onNuxtReady(() => {
  item.getDetail()
})

function changeSupplier() {
  // Find Supplier
  const findSupplier = supplier.suppliers.find(sup => sup.id === item.itemForm.supplier_id)
  if (findSupplier) {
    // Auto Assign Supplier Code
    item.itemForm.code = findSupplier.code + nuxt.$padNumberWithZeros((findSupplier.total_item ?? 0) + 1)
  }
}
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="item.submitForm" @reset="item.resetForm" class="q-gutter-md">
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')"
        v-model="item.itemForm.name" :autofocus="true" />

      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.supplier')"
        v-model="item.itemForm.supplier_id" :options="supplier.suppliers" @change="changeSupplier" v-if="!supplier.loading" />

      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.category')"
        v-model="item.itemForm.sub_category_id" :options="subCategory.subCategories" v-if="!subCategory.loading" />

      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.code')"
        v-model="item.itemForm.code" />

      {{ $getTranslation('shared.labels.barcodeDefaultSameAsCode') }}
      <forms-input class="mb-5" :label="$getTranslation('shared.columns.barcode')" v-model="item.itemForm.barcode" />

      <VueBarcode class="mb-5" v-if="item.itemForm.barcode || item.itemForm.code" :value="item.itemForm.barcode && item.itemForm.barcode !== null ? item.itemForm.barcode : item.itemForm.code" tag="svg" />

      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.unit')"
        v-model="item.itemForm.unit_id" :options="unit.units" v-if="!unit.loading" />

      <forms-input :required="true" type="number" :rules="[rule.required]" :label="$getTranslation('shared.columns.stockAlert')"
        v-model="item.itemForm.stock_alert" />

      <forms-action-button :loading="item.loading" />
    </q-form>
  </div>
</template>