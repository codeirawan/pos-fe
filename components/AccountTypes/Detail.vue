<script setup lang="ts">
const module = 'account-types'
const accountType = useAccountTypeStore()
onNuxtReady(() => {
  accountType.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="accountType.accountTypeForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="accountType.accountTypeForm.name" />
  </div>
</template>
