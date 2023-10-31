<script setup lang="ts">
const module = 'service-types'
const serviceType = useServiceTypeStore()
const rule = useRule()
onNuxtReady(() => {
  serviceType.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="serviceType.submitForm" @reset="serviceType.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="serviceType.serviceTypeForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-action-button :loading="serviceType.loading" />
    </q-form>
  </div>
</template>
