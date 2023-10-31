<script setup lang="ts">
const module = 'service-types'
const serviceType = useServiceTypeStore()
onNuxtReady(() => {
  serviceType.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="serviceType.serviceTypeForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="serviceType.serviceTypeForm.name" />
  </div>
</template>
