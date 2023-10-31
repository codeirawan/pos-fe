<script setup lang="ts">
export interface IInput {
  label?: string
  modelValue: number | null
  type?: "number" | "textarea" | "time" | "text" | "password" | "email" | "search" | "tel" | "file" | "url" | "date" | undefined
  rules?: any[]
  required?: boolean
  readonly?: boolean
  prefix?: string | undefined
  disable?: boolean
  autofocus?: boolean
}

const defaultProps = withDefaults(defineProps<IInput>(), {
  type: 'text'
})

const emit = defineEmits(['update:modelValue'])

function onUpdate(event: any) {
  emit('update:modelValue', event.toUpperCase())
}

import { useCurrencyInput } from "vue-currency-input";
const {
  inputRef,
  formattedValue,
  setValue,
  setOptions,
} = useCurrencyInput({ currency: 'USD' });
watch(
  () => defaultProps.modelValue,
  (value) => {
    setValue(value);
  }
);

watch(
  () => 'USD',
  (currency) => {
    setOptions({ currency });
  }
);
</script>

<template>
  <q-input
    ref="inputRef"
    class="ma-0" dense filled
    :label="label" :modelValue="formattedValue" @update:modelValue="onUpdate"
    @change:modelValue="onUpdate" @input:modelValue="onUpdate" :disable="disable" :autofocus="autofocus" />
</template>