<script setup lang="ts">
const module = 'purchase-returns'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.purchasesReturnTable" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasCreateButton="false" :hasDeleteButton="false" :hasDetailButton="false" :hasEditButton="false" :returnPurchaseDetailButton="true" :returnPurchaseEditButton="true" />
  </div>
</template>
