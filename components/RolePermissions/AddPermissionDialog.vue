<script setup lang="ts">
const rolePermission = useRolePermissionStore()
const permission = usePermissionStore()
const rule = useRule()

const addRoleDialog = ref(false)

defineExpose({
  openDialog
})

const emit = defineEmits(['success'])

async function submit() {
  const response = await rolePermission.submitForm()
  if (response === true) {
    addRoleDialog.value = false
  }

  emit('success')
}

function openDialog() {
  addRoleDialog.value = true
}
await permission.getAll()
</script>
<template>
  <q-dialog v-model="addRoleDialog">
    <q-card>
      <q-card-section>
        <q-form @submit="submit()" @reset="rolePermission.resetForm()" @validation-error="$formValidationError">
          <forms-select v-model="rolePermission.rolePermissionForm.permission_id" :options="permission.permissions" :required="true"
            :rules="[rule.required]" :label="$getTranslation('shared.columns.permission')" />
          <forms-action-button :loading="rolePermission.loading" class="mb-5" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>