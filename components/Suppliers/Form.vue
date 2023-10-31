<script setup lang="ts">
const module = 'suppliers'
const supplier = useSupplierStore()
const rule = useRule()
onNuxtReady(() => {
  supplier.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="supplier.submitForm" @reset="supplier.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="supplier.supplierForm.name" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-input v-model="supplier.supplierForm.code" :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.code')" />
      <forms-action-button :loading="supplier.loading"/>
    </q-form>
  </div>
</template>
