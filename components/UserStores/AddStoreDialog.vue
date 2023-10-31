<script setup lang="ts">
const store = useStoreStore()
const userStore = useUserStoreStore()
const rule = useRule()

const addStoreDialog = ref(false)

defineExpose({
  openDialog
})

const emit = defineEmits(['success'])

async function submit() {
  const response = await userStore.submitForm()
  if (response === true) {
    addStoreDialog.value = false
  }

  emit('success')
}

function openDialog() {
  addStoreDialog.value = true
}
await store.getAll()
</script>
<template>
  <q-dialog v-model="addStoreDialog">
    <q-card>
      <q-card-section>
        <q-form @submit="submit()" @reset="userStore.resetForm()" @validation-error="$formValidationError">
          <forms-select v-model="userStore.userStoreForm.store_id" :options="store.stores" :required="true"
            :rules="[rule.required]" :label="$getTranslation('shared.columns.store')" />
          <forms-action-button :loading="userStore.loading" class="mb-5" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>