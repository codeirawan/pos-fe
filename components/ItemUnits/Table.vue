<script setup lang="ts">
const module = 'item-units'
const subModule = 'units'
const tableColumn = useTableColumn()
const route = useRoute()
</script>
<template>
  <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation(`modules.${$toCamelCase(module)}.title`)" :columns="tableColumn.itemUnitsTable" :module="`items/${route.params.item_id}/${module}`" :params="`&item_id=${route.params.item_id}`" :subModule="subModule" :hasDetailButton="false"></forms-data-table>
</template>
