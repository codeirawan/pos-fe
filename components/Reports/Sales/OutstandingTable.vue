<script setup lang="ts">
</script>
<template>
  <div>
    <forms-data-table :columns="useTableColumn().outstandingSalesTable" module="sales/outstanding" :hasCreateButton="false" :title="$getTranslation(`modules.outstandingSales.title`)" />
  </div>
</template>