<script setup lang="ts">
const { data } = useAuth()
const route = useRoute()

function activeStore(): any {
  const activeStore = data.value!.stores.find(store => store.id === parseInt(route.params.store_id.toString()))
  return activeStore
}
</script>

<template>
  <div class="q-pa-md">
    <stores-detail-data :data="activeStore()" />
  </div>
</template>
