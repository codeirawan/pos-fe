<script setup lang="ts">
const { status } = useAuth()

onMounted(() => {
  if (status.value === 'authenticated') {
    navigateTo('/')
  }
})

definePageMeta({
  auth: false,
})
</script>

<template>
  <AuthLogin />
</template>
