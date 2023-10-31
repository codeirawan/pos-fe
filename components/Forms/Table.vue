<script setup lang="ts">
const nuxt = useNuxtApp()

export interface ITable {
  rows: any[]
  columns: any[]
  module?: string
  title?: string
}

withDefaults(defineProps<ITable>(), {})

const filter = ref('')
let selectedId: number = 0
const confirm = ref(false)

function openConfirmDialog(id: number) {
  selectedId = id
  confirm.value = true
}

function deleteItem() {
  confirm.value = false
  nuxt.$notify(true, nuxt.$getTranslation('shared.notifications.deleted'))
}
</script>

<template>
  <q-table dense :rows="rows" :columns="columns" row-key="name" :filter="filter"
    :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <b v-if="!!title">{{ title }}</b>
      <q-btn v-if="!!module" color="primary" :to="$getLocalePath(`/${module}/create`)"
        :label="$getTranslation('shared.buttons.create')" />
      <q-space />
      <q-input filled borderless dense debounce="300" v-model="filter"
        :placeholder="$getTranslation('shared.inputs.search')">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn v-if="!!module" dense round flat color="black" :to="$getLocalePath(`/${module}/${props.row.id}`)" icon="edit">
          <q-tooltip>{{ $getTranslation('shared.buttons.show') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="!!module" dense round flat color="secondary" :to="$getLocalePath(`/${module}/${props.row.id}/edit`)" icon="edit">
          <q-tooltip>{{ $getTranslation('shared.buttons.edit') }}</q-tooltip>
        </q-btn>
        <q-btn dense round flat color="negative" icon="delete" @click="openConfirmDialog(props.row.id)">
          <q-tooltip>{{ $getTranslation('shared.buttons.delete') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>
    <template v-slot:body-cell-children="props">
      <q-td :props="props">
        <q-btn color="primary" :to="$getLocalePath(props.value)">{{ props.col.label }}</q-btn>
      </q-td>
    </template>
  </q-table>

  <!-- Delete Dialog -->
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <span class="q-ml-sm">{{ $getTranslation('shared.labels.confirmDelete') }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$getTranslation('shared.buttons.cancel')" color="primary" @click="confirm = !confirm" />
        <q-btn flat :label="$getTranslation('shared.buttons.confirm')" color="negative" @click="deleteItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>