<script setup lang="ts">
const module = 'items'
const tableColumn = useTableColumn()
const route = useRoute()
</script>

<template>
  <div>
    <q-btn class="mb-3" color="primary" :to="`${route.path}/form-wizard`" :label="$getTranslation('shared.buttons.create') + ` (${$getTranslation('shared.labels.new')})`" />
    <forms-data-table :columns="tableColumn.itemsTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" />
  </div>
</template>
