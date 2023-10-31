<script setup lang="ts">
const module = 'accounts'
const account = useAccountStore()
const accountType = useAccountTypeStore()
const rule = useRule()

await accountType.getAll()

onNuxtReady(() => {
  account.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="account.submitForm" @reset="account.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="account.accountForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-input v-model="account.accountForm.number" type="number"
        :label="$getTranslation('shared.columns.accountNumber')" />
      <forms-select v-model="account.accountForm.account_type_id" :options="accountType.accountTypes" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.accountType')" />
      <forms-action-button :loading="account.loading" />
    </q-form>
  </div>
</template>
