
<script setup lang="ts">
export interface IChecbox {
  disabled?: boolean
  required?: boolean
  modelValue: boolean
  rules?: any[]
  color?: string
  flat?: boolean
  label: string,
}

withDefaults(defineProps<IChecbox>(), {
  label: '',
  disabled: false,
  color: 'primary',
  flat: false
})

const emit = defineEmits(['update:modelValue'])

function onUpdate(event: any) {
  emit('update:modelValue', event)
}
</script>

<template>
  <q-checkbox :rules="rules" :label="label" :modelValue="modelValue" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" />
</template>