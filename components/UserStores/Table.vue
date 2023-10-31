<script setup lang="ts">
const route = useRoute()
const tableColumn = useTableColumn()
const addStoreDialog = ref()
const userStoreTable = ref()

function onClickCreate() {
  addStoreDialog.value.openDialog()
}
</script>

<template>
  <div>
    <user-stores-add-store-dialog ref="addStoreDialog" @success="userStoreTable.reload()" />
    <forms-data-table ref="userStoreTable" :columns="tableColumn.userStoresTable" :module="`users/${route.params.user_id}/stores`" :title="$getTranslation(`modules.stores.title`)" :hasDetailButton="false" :hasEditButton="false" :customCreateFunction="true" @customCreateFunction="onClickCreate" />
  </div>
</template>
