
<script setup lang="ts">
export interface IChecbox {
  disabled?: boolean
  required?: boolean
  modelValue: string
  rules?: any[]
  color?: string
  flat?: boolean
  choices?: string[]
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
  <q-radio v-for="choice in choices" :val="choice" :rules="rules" :label="choice" :modelValue="modelValue" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" />
</template>