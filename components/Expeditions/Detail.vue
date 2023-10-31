<script setup lang="ts">
const module = 'expeditions'
const expedition = useExpeditionStore()
onNuxtReady(() => {
  expedition.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="expedition.expeditionForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="expedition.expeditionForm.name" />
  </div>
</template>
