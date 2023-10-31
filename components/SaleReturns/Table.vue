<script setup lang="ts">
const module = 'sale-returns'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.salesReturnTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasCreateButton="false" :hasDeleteButton="false" :hasDetailButton="false" :hasEditButton="false" :returnSaleDetailButton="true" :returnSaleEditButton="true" />
  </div>
</template>
