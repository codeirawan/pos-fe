<script setup lang="ts">
export interface IInput {
  label?: string
  modelValue: string | number | null | undefined
  type?: "number" | "textarea" | "time" | "text" | "password" | "email" | "search" | "tel" | "file" | "url" | "date" | undefined
  rules?: any[]
  required?: boolean
  readonly?: boolean
  prefix?: string | undefined
  disable?: boolean
  autofocus?: boolean
}

withDefaults(defineProps<IInput>(), {
  type: 'text'
})

const emit = defineEmits(['update:modelValue'])

function onUpdate(event: any) {
  emit('update:modelValue', event.toUpperCase())
}

const togglePassword = ref(false)

</script>

<template>
  <q-input :req="required ? 1 : 0" class="ma-0" :readonly="readonly" :type="togglePassword ? 'text' : type" dense filled :label="label" :rules="rules" :prefix="prefix" :modelValue="modelValue" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" :disable="disable" :autofocus="autofocus" >
    <template v-slot:append>
      <q-icon v-if="type === 'password'"
        :name="togglePassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="togglePassword = !togglePassword"
      />
    </template>
  </q-input>
</template>