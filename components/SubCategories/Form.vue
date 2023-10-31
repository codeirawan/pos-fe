<script setup lang="ts">
const module = 'categories'
const module2 = 'sub-categories'
const subCategory = useSubCategoryStore()
const rule = useRule()
onNuxtReady(() => {
  subCategory.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :module2="module2" :title2="$getTranslation(`modules.${$toCamelCase(module2)}.title`)" page="Detail" page2="table" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="subCategory.submitForm" @reset="subCategory.resetForm" @validation-error="$formValidationError" class="q-gutter-md">
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')" v-model="subCategory.subCategoryForm.name" :autofocus="true" />
      <forms-action-button :loading="subCategory.loading" />
    </q-form>
  </div>
</template>