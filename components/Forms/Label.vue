<script setup lang="ts">
export interface IInput {
  label: string
  value: string
}

withDefaults(defineProps<IInput>(), {
  label: '',
  value: ''
})

</script>

<template>
  <div class="ma-0 mb-1">
    <p><b>{{ label }}</b>: {{ value }}</p>
  </div>
</template>