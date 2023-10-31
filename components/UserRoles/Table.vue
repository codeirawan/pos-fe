<script setup lang="ts">
const route = useRoute()
const tableColumn = useTableColumn()
const addRoleDialog = ref()
const userRoleTable = ref()

function onClickCreate() {
  addRoleDialog.value.openDialog()
}
</script>

<template>
  <div>
    <user-roles-add-role-dialog ref="addRoleDialog" @success="userRoleTable.reload()" />
    <forms-data-table ref="userRoleTable" :columns="tableColumn.userRolesTable" :module="`users/${route.params.user_id}/roles`" :title="$getTranslation(`modules.userRoles.title`)" :hasDetailButton="false" :hasEditButton="false" :customCreateFunction="true" @customCreateFunction="onClickCreate" />
  </div>
</template>
