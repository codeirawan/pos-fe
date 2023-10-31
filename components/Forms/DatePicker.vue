<script setup lang="ts">
export interface IDatePicker {
  label?: string
  modelValue: string | number | null | undefined
  rules?: any[]
  options?: any
  required?: boolean
  prefix?: string | undefined
}

defineProps<IDatePicker>()

const emit = defineEmits(['update:modelValue', 'change'])

function onUpdate(event: any) {
  emit('update:modelValue', event)
  emit('change', event)
}
</script>

<template>
  <q-input class="ma-0" :required="required ? 1 : 0" filled dense :modelValue="modelValue" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" :label="label" :rules="rules" :options="options">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date :required="required" :modelValue="modelValue" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" mask="YYYY-MM-DD">
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="$getTranslation('shared.buttons.close')" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>