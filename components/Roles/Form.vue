<script setup lang="ts">
const module = 'roles'
const role = useRoleStore()
const rule = useRule()
role.getDetail()
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="role.submitForm" @reset="role.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="role.roleForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-action-button :loading="role.loading" />
    </q-form>
  </div>
</template>
