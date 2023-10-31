<script setup lang="ts">

export interface ISelect {
  label: string
  modelValue: string | number | null | undefined
  rules?: any[]
  options: any[]
  optionValue?: string
  optionLabel?: string
  required?: boolean
  clearable?: boolean
  useInput?: boolean
  dark?: boolean
  autofocus?: boolean
  multiple?: boolean
}

const props = withDefaults(defineProps<ISelect>(), {
  optionValue: 'id',
  optionLabel: 'name',
  clearable: true,
  useInput: true,
  dark: false,
  multiple: false
})

let selections = props.options

const options = ref(selections)

function filterFn(val: string, update: (arg0: () => void) => void, abort: any): void {
  update(() => {
    if (val === '') {
      options.value = selections
    } else {
      const needle = val.toLowerCase()
      options.value = selections.filter(v => v[props.optionLabel ?? ''].toLowerCase().indexOf(needle) > -1)
    }
  })
}

const emit = defineEmits(['update:modelValue', 'change'])
function onUpdate(event: any) {
  emit('update:modelValue', event)
  emit('change', event)
}
</script>

<template>
  <q-select :req="required ? 1 : 0" class="ma-0" filled dense :clearable="clearable" :rules="rules" :modelValue="modelValue"
    :option-value="optionValue" :option-label="optionLabel" :dark="dark" @update:modelValue="onUpdate" :use-input="useInput" hide-selected fill-input input-debounce="0"
    :options="options" :label="label" @filter="filterFn" emit-value map-options :autofocus="autofocus" :multiple="multiple">
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $getTranslation('shared.labels.notFound') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

