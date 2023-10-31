<script setup lang="ts">
const module = 'expeditions'
const expedition = useExpeditionStore()
const rule = useRule()
onNuxtReady(() => {
  expedition.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="expedition.submitForm" @reset="expedition.resetForm" @validation-error="$formValidationError">
      <forms-input
        v-model="expedition.expeditionForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true"
      />
      <forms-action-button :loading="expedition.loading" />
    </q-form>
  </div>
</template>
