<script setup lang="ts">
const module = 'users'
const user = useUserStore()
const userId = computed(() => useRoute().params.user_id)

onMounted(() => {
  user.getDetail(parseInt(userId.value.toString()))
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.id')" :value="user.userForm.id?.toString()" />
    <forms-label :label="$getTranslation('shared.columns.name')" :value="user.userForm.name" />
    <forms-label :label="$getTranslation('shared.columns.phone')" :value="user.userForm.phone" />
    <br/>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <user-stores-table />
      </div>
      <div class="col-12 col-md-6">
        <user-roles-table />
      </div>
    </div>
  </div>
</template>
