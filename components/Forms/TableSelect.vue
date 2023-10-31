<script setup lang="ts">

const filter = ref('')

export interface ITableSelect {
  rows: any[]
  columns: any[]
}
defineProps<ITableSelect>()
</script>

<template>
  <q-table class="mx-0" dense :rows="rows" :columns="columns" row-key="name" :filter="filter"
    :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <q-space />
      <q-input filled borderless dense debounce="300" v-model="filter" :placeholder="$getTranslation('shared.inputs.search')" :autofocus="true">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense color="primary" @click="$emit('addButton', props.row)">{{ $getTranslation('shared.buttons.add')
        }}</q-btn>
      </q-td>
    </template>
  </q-table>
</template>