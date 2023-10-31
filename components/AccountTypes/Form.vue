<script setup lang="ts">
const module = 'account-types'
const accountType = useAccountTypeStore()
const rule = useRule()
onNuxtReady(() => {
  accountType.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="accountType.submitForm" @reset="accountType.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="accountType.accountTypeForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-action-button :loading="accountType.loading" />
    </q-form>
  </div>
</template>
