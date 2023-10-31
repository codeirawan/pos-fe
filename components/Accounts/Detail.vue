<script setup lang="ts">
const module = 'accounts'
const account = useAccountStore()
onNuxtReady(() => {
  account.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="account.accountForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="account.accountForm.name" />
    <forms-label :label="$getTranslation('shared.columns.accountType')" :value="account.accountForm.account_type_name" />
  </div>
</template>
