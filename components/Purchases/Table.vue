<script setup lang="ts">
const module = 'purchases'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.purchasesTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasReturnPurchaseButton="true" :hasEditButton="false" />
  </div>
</template>
