<script setup lang="ts">
const module = 'units'
const unit = useUnitStore()
onNuxtReady(() => {
  unit.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="unit.unitForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="unit.unitForm.name" />
  </div>
</template>