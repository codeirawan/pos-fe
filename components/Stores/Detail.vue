<script setup lang="ts">
const store = useStoreStore()
onNuxtReady(() => {
  store.getDetail()
})
</script>

<template>
  <div>
    <stores-detail-data :data="store.storeForm" />
  </div>
</template>
