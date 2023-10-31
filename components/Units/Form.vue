<script setup lang="ts">
const module = 'units'
const unit = useUnitStore()
const rule = useRule()
onNuxtReady(() => {
  unit.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="unit.submitForm" @reset="unit.resetForm" @validation-error="$formValidationError" class="q-gutter-md">
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')"
        v-model="unit.unitForm.name" :autofocus="true" />
      <forms-action-button :loading="unit.loading" />
    </q-form>
  </div>
</template>