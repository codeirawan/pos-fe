<script setup lang="ts">
export interface IButton {
  label?: string
  disabled?: boolean
  color?: string
  flat?: boolean
}

withDefaults(defineProps<IButton>(), {
  label: '',
  disabled: false,
  color: 'primary',
  flat: false
})

const emit = defineEmits(['click'])

function click(event: any) {
  emit('click', event)
}
</script>

<template>
  <q-btn :flat="flat" :disabled="disabled" :label="label" :color="color" @click="click" />
</template>