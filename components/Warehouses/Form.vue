<script setup lang="ts">
const module = 'warehouses'
const warehouse = useWarehouseStore()
const rule = useRule()
onNuxtReady(() => {
  warehouse.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="warehouse.submitForm" @reset="warehouse.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="warehouse.warehouseForm.name" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-input type="textarea" :label="$getTranslation('shared.columns.address')" :required="true" :rules="[rule.required]" v-model="warehouse.warehouseForm.address" />
      <forms-action-button :loading="warehouse.loading" />
    </q-form>
  </div>
</template>
