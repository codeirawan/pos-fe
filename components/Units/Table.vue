<script setup lang="ts">
const module = 'units'
const tableColumn = useTableColumn()
</script>

<template>
  <div>
    <forms-data-table :columns="tableColumn.unitsTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"/>
  </div>
</template>
