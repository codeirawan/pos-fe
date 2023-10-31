<script setup lang="ts">
const module = 'admin-receivings'
const tableColumn = useTableColumn()
</script>
<template>
  <div>
    <forms-data-table :columns="tableColumn.adminReceivingTable" :module="module"
      :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" :hasEditButton="false" :hasCreateButton="false"
      :hasDeleteButton="false" :withWarehouseId="true" />
  </div>
</template>
