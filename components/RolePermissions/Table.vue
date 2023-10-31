<script setup lang="ts">
const route = useRoute()
const tableColumn = useTableColumn()
const addRolePermissionDialog = ref()
const rolePermissionTable = ref()

function onClickCreate() {
  addRolePermissionDialog.value.openDialog()
}
</script>

<template>
  <div>
    <role-permissions-add-permission-dialog ref="addRolePermissionDialog" @success="rolePermissionTable.reload()" />
    <forms-data-table ref="rolePermissionTable" :columns="tableColumn.userRolesTable" :module="`roles/${route.params.role_id}/permissions`" :title="$getTranslation(`modules.rolePermissions.title`)" :hasDetailButton="false" :hasEditButton="false" :customCreateFunction="true" @customCreateFunction="onClickCreate" />
  </div>
</template>
