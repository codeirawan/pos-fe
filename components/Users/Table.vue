<script setup lang="ts">
const module = 'users'
const tableColumn = useTableColumn()
</script>

<template>
  <div>
    <forms-data-table :columns="tableColumn.usersTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)"/>
  </div>
</template>
