<script setup lang="ts">
const module = 'price-categories'
const priceCategory = usePriceCategoryStore()
const rule = useRule()
onNuxtReady(() => {
  priceCategory.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="priceCategory.submitForm" @reset="priceCategory.resetForm" @validation-error="$formValidationError">
      <forms-input
        v-model="priceCategory.priceCategoryForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true"
      />
      <forms-action-button :loading="priceCategory.loading" />
    </q-form>
  </div>
</template>
