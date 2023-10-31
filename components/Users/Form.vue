<script setup lang="ts">
const module = 'users'
const user = useUserStore()
const rule = useRule()
onNuxtReady(() => {
  user.getDetail()
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md" style="max-width: 500px">
    <q-form class="q-gutter-md" @submit="user.submitForm" @reset="user.resetForm"
      @validation-error="$formValidationError">
      <forms-input v-model="user.userForm.name" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.name')" :autofocus="true" />
      <forms-input v-model="user.userForm.phone" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.phone') + ` (628xxx)`" />
      <forms-input type="password" v-model="user.userForm.password" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.password')" />
      <forms-input type="password" v-model="user.userForm.repeat_password" :required="true" :rules="[rule.required]"
        :label="$getTranslation('shared.columns.repeatPassword')" />
      <forms-action-button :loading="user.loading" />
    </q-form>
  </div>
</template>
