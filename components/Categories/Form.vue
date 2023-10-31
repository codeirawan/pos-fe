<script setup lang="ts">
const module = 'categories'
const category = useCategoryStore()
const rule = useRule()
onNuxtReady(() => {
  category.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form @submit="category.submitForm" @reset="category.resetForm" @validation-error="$formValidationError" class="q-gutter-md">
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')"
        v-model="category.categoryForm.name" :autofocus="true" />
      <forms-action-button :loading="category.loading" />
    </q-form>
  </div>
</template>