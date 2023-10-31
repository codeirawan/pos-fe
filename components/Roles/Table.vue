<script setup lang="ts">
const module = 'roles'
const tableColumn = useTableColumn()
</script>

<template>
  <div>
    <forms-data-table :columns="tableColumn.rolesTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"/>
  </div>
</template>
