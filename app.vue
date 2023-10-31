<script setup lang="ts">
import { appName } from '~/constants'

const store = useOnlineStore()
const { $pwa } = useNuxtApp()

useHead({
  title: appName,
})
async function handleConnectionChange() {
  if (navigator.onLine) {
    store.changeOnline(true)
    $pwa.updateServiceWorker()
  }
  else {
    store.changeOnline(false)
  }
}

onMounted(() => {
  window.addEventListener('online', handleConnectionChange)
  window.addEventListener('offline', handleConnectionChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', handleConnectionChange)
  window.removeEventListener('offline', handleConnectionChange)
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

.q-td .q-field .q-icon.text-negative {
  display: none;
}

.box-title-table {
  font-size: 1.2rem;
  font-weight: 500;
  width: 109%;
  background: #f2f2f2;
  margin-bottom: 6px;
  position: relative;
  margin-left: -16px;
  margin-right: -16px;
  margin-top: -6px;
  padding: 10px 0;
}

.title-table {
  margin-left: 15px;
}
</style>
