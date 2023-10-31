

<script setup lang="ts">
export interface IToggle {
  label?: string
  disabled?: boolean
  required?: boolean
  modelValue: number
  rules?: any[]
  color?: string
  flat?: boolean
  marginBottom?: boolean
}

withDefaults(defineProps<IToggle>(), {
  label: '',
  disabled: false,
  color: 'primary',
  flat: false,
  marginBottom: true
})

const emit = defineEmits(['update:modelValue'])

function onUpdate(event: boolean) {
  emit('update:modelValue', event ? 1 : 0)
}
</script>

<template>
  <q-toggle :req="required ? 1 : 0" :class="`ma-0 ${marginBottom ? 'mb-5' : 'mb-0'}`" :rules="rules" :label="label" :modelValue="modelValue ? true : false" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" />
</template>