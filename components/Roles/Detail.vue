<script setup lang="ts">
const module = 'roles'
const role = useRoleStore()
const roleId = computed(() => useRoute().params.role_id)

onMounted(() => {
  role.getDetail(parseInt(roleId.value.toString()))
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="role.roleForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="role.roleForm.name" />
    <br/>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <role-permissions-table />
      </div>
    </div>
  </div>
</template>
