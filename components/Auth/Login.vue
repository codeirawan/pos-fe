<script setup lang="ts">
import { useOnlineStore } from '~/composables/online'

const { data, signIn } = useAuth()
const auth = useAuthStore()
const rule = useRule()
const nuxt = useNuxtApp()
const loading = ref(false)
const store = useOnlineStore()
async function login() {
  try {
    loading.value = true
    await signIn({ phone: auth.userLoginForm.phone, password: auth.userLoginForm.password }, { callbackUrl: '' })
    const object = data.value
    const firstStoreId = object!.stores[0].id
    store.setIdstore(firstStoreId)
    nuxt.$notify(true, nuxt.$getTranslation('shared.notifications.loginSuccess'))

    // synchronous items data
    await useSynchron(firstStoreId, false)
  }
  catch (error: any) {
    nuxt.$notify(false, error.message)
  }
  loading.value = false
}
</script>

<template>
  <div class="q-pa-md mx-auto" style="max-width: 500px">
    <q-form @submit="login()" @reset="auth.userLoginForm" @validation-error="$formValidationError" class="q-gutter-md">
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.phone')"
        v-model="auth.userLoginForm.phone" />
      <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.password')"
        v-model="auth.userLoginForm.password" type="password" />
      <div class="text-center">
        <q-btn type="submit" class="ma-0 px-10" color="primary" :loading="loading">
          {{ $getTranslation('shared.buttons.login')}}
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
