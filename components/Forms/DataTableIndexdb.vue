<script setup lang="ts">
import type Dexie from 'dexie'
import { useOnlineStore } from '~/composables/online'

const props = defineProps({
  columns: Array as () => any[],
  module: String,
  subModule: String,
  title: String,
  hasDeleteButton: {
    type: Boolean,
    default: true,
  },
  hasCreateButton: {
    type: Boolean,
    default: true,
  },
  hasEditButton: {
    type: Boolean,
    default: true,
  },
  params: {
    type: Object,
    defualt: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  uriDetail: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['load'])

const store = useOnlineStore()

const loading = ref(props.loading)
const hasDeleteButton = ref(props.hasDeleteButton)
const hasCreateButton = ref(props.hasCreateButton)
const hasEditButton = ref(props.hasEditButton)

const nuxt = useNuxtApp()
const route = useRoute()
const tableRef = ref()
const rows = ref([]) as any
const db = nuxt.$dexie as Dexie
let dbName: string = props.module as string
let storeId = 0
if (dbName)
  dbName = nuxt.$toCamelCase(dbName)

if (route.params.store_id)
  storeId = parseInt(route.params.store_id.toString())

const filter = ref('')

let selectedId = 0
const confirm = ref(false)

function openConfirmDialog(id: number) {
  selectedId = id
  confirm.value = true
}

async function deleteItem() {
  let response = null as any
  let success = false
  let message = ''
  try {
    response = await nuxt.$fetcher({
      method: 'DELETE',
      url: `${props.module}/${selectedId}`,
    })
    success = response.success
    message = response.message
    if (success)
      emit('load', success)
  }
  catch (error: any) {
    message = error.data.message
  }

  confirm.value = false
  nuxt.$notify(success, message)
  selectedId = 0
  tableRef.value.requestServerInteraction()
}

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
})

function reload() {
  onRequest()
}

defineExpose({
  reload,
})

async function onRequest() {
  const { page, rowsPerPage, sortBy, descending } = pagination.value
  try {
    const offsetValue = (page - 1) * rowsPerPage
    let data = []
    let totalCount = 0
    if (props.params) {
      data = await db.table(dbName).where(props.params).offset(offsetValue).limit(rowsPerPage).toArray()
      totalCount = await db.table(dbName).where(props.params).count()
    }
    else {
      data = await db.table(dbName).where('store_id').equals(storeId).offset(offsetValue).limit(rowsPerPage).toArray()
      totalCount = await db.table(dbName).where('store_id').equals(storeId).count()
    }
    if (sortBy) {
      data.sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
        const sortResult = a[sortBy] > b[sortBy] ? 1 : -1
        return descending ? -sortResult : sortResult
      })
    }

    // Memperbarui nilai rows dengan data yang diambil
    rows.value.splice(0, rows.value.length, ...data)

    // Menghitung jumlah total data untuk paginasi

    pagination.value.rowsNumber = totalCount
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
  }
  catch (e) {
  }
}
async function handleConnectionChange(_online: boolean) {
  if (_online) {
    emit('load', true)
    hasDeleteButton.value = true
    hasCreateButton.value = true
    hasEditButton.value = true
  }
  else {
    hasDeleteButton.value = false
    hasCreateButton.value = false
    hasEditButton.value = false
  }
}

function urlShow(id: string) {
  if (props.uriDetail)
    return nuxt.$getLocalePath(`/${props.uriDetail}/${id}`)
  else
    return nuxt.$getLocalePath(`/${props.module}/${id}`)
}

onMounted(async () => {
  tableRef.value.requestServerInteraction()
})

watch(() => props.loading, (newValue) => {
  loading.value = newValue
  tableRef.value.requestServerInteraction()
})
watch(() => store.online, (newValue) => {
  loading.value = newValue
  handleConnectionChange(newValue)
})
</script>

<template>
  <q-table
    ref="tableRef" v-model:pagination="pagination" dense :rows="rows" :columns="columns" row-key="id" :filter="filter"
    :loading="loading" :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')" @request="onRequest"
  >
    <template #top>
      <div class="box-title-table"><span class="title-table">{{ title }}</span></div>
      <q-btn
        v-if="!!module && hasCreateButton" color="primary" :to="subModule ? `${route.path}/${subModule}/create` : `${route.path}/create`"
        :label="$getTranslation('shared.buttons.create')"
      />
      <q-space />
      <q-input
        v-model="filter" filled borderless dense debounce="300"
        :placeholder="$getTranslation('shared.inputs.search')"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          v-if="!!module" dense round flat color="black" :to="subModule ? `${route.path}/${subModule}/${props.row.id}` : `${route.path}/${props.row.id}`"
          icon="edit"
        >
          <q-tooltip>{{ $getTranslation('shared.buttons.show') }}</q-tooltip>
        </q-btn>
        <q-btn
          v-if="!!module && (module !== 'purchases' && module !== 'sales') && hasEditButton" dense round flat color="secondary"
          :to="subModule ? `${route.path}/${subModule}/${props.row.id}/edit` : `${route.path}/${props.row.id}/edit`" icon="edit"
        >
          <q-tooltip>{{ $getTranslation('shared.buttons.edit') }}</q-tooltip>
        </q-btn>
        <q-btn
          v-if="hasDeleteButton" dense round flat color="negative" icon="delete"
          @click="openConfirmDialog(props.row.id)"
        >
          <q-tooltip>{{ $getTranslation('shared.buttons.delete') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>
    <template #body-cell-select="props">
      <q-td :props="props">
        <q-btn dense color="primary" @click="$emit('addButton', props.row)">
          {{ $getTranslation('shared.buttons.add')
          }}
        </q-btn>
      </q-td>
    </template>
    <template #body-cell-custom-button="props">
      <q-td :props="props">
        <q-btn dense color="primary" @click="$emit('customButtonClick', props.row)">
          {{ props.col.label }}
        </q-btn>
      </q-td>
    </template>
    <template #body-cell-children="props">
      <q-td :props="props">
        <q-btn color="primary" :to="$getLocalePath(props.value)">
          {{ props.col.label }}
        </q-btn>
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
plugins
