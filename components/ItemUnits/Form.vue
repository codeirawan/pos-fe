<script setup lang="ts">
const module = 'items'
const module2 = 'units'
const itemUnit = useItemUnitStore()
const unit = useUnitStore()
const rule = useRule()
const route = useRoute()

await unit.getAll(route.params.item_id.toString())

onNuxtReady(() => {
  itemUnit.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :module2="module2" :title2="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.unit')" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="itemUnit.submitForm" @reset="itemUnit.resetForm" class="q-gutter-md">
      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.unit')"
        v-model="itemUnit.itemUnitForm.unit_id" :options="unit.units" :autofocus="true" />

      <forms-input type="number" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.quantity')"
        v-model="itemUnit.itemUnitForm.quantity" />
      <forms-action-button :loading="unit.loading" />
    </q-form>
  </div>
</template>