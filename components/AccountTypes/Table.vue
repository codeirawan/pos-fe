<script setup lang="ts">
const module = 'account-types'
const tableColumn = useTableColumn()
</script>

<template>
  <div>
    <forms-data-table :columns="tableColumn.accountTypesTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"/>
  </div>
</template>
