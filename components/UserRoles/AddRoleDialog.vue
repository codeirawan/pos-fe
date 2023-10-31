<script setup lang="ts">
const userRole = useUserRoleStore()
const role = useRoleStore()
const rule = useRule()

const addRoleDialog = ref(false)

defineExpose({
  openDialog
})

const emit = defineEmits(['success'])

async function submit() {
  const response = await userRole.submitForm()
  if (response === true) {
    addRoleDialog.value = false
  }

  emit('success')
}

function openDialog() {
  addRoleDialog.value = true
}
await role.getAll()
</script>
<template>
  <q-dialog v-model="addRoleDialog">
    <q-card>
      <q-card-section>
        <q-form @submit="submit()" @reset="userRole.resetForm()" @validation-error="$formValidationError">
          <forms-select v-model="userRole.userRoleForm.role_id" :options="role.roles" :required="true"
            :rules="[rule.required]" :label="$getTranslation('shared.columns.role')" />
          <forms-action-button :loading="userRole.loading" class="mb-5" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>