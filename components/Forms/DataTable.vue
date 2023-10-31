<script setup lang="ts">
import { IAPIResponse } from '~/interfaces/IAPI'
import { permissionView, permissionUpdate, permissionCreate, permissionDelete } from "~/constants/permission"

const nuxt = useNuxtApp()
const tableRef = ref()
const rows = ref([]) as any
const route = useRoute()

export interface ITable {
  columns: any[]
  module: string
  subModule?: string
  title?: string
  hasDetailButton?: boolean
  hasDeleteButton?: boolean
  hasCancelButton?: boolean
  hasReturnSaleButton?: boolean
  returnSaleEditButton?: boolean
  returnSaleDetailButton?: boolean
  hasReturnPurchaseButton?: boolean
  returnPurchaseEditButton?: boolean
  returnPurchaseDetailButton?: boolean
  hasCustomButton?: boolean
  hasEditButton?: boolean
  hasCreateButton?: boolean
  params?: string
  customCreateFunction?: boolean
  withWarehouseId?: boolean
}
const defaultProps = withDefaults(defineProps<ITable>(), {
  hasDetailButton: true,
  hasDeleteButton: true,
  hasCancelButton: false,
  hasReturnSaleButton: false,
  returnSaleEditButton: false,
  returnSaleDetailButton: false,
  hasReturnPurchaseButton: false,
  returnPurchaseEditButton: false,
  returnPurchaseDetailButton: false,
  hasCustomButton: true,
  hasCreateButton: true,
  hasEditButton: true,
  withWarehouseId: false
})

const filter = ref('')

let selectedId = 0
const confirmDelete = ref(false)
const confirmCancel = ref(false)
const loading = ref(true)

function openConfirmDeleteDialog(id: number) {
  selectedId = id
  confirmDelete.value = true
}

function openConfirmCancelDialog(id: number) {
  selectedId = id
  confirmCancel.value = true
}

async function deleteItem() {
  loading.value = true
  let response = null as any
  let success = false
  let message = ''
  try {
    response = await nuxt.$fetcher({
      method: 'DELETE',
      url: `${defaultProps.module}/${selectedId}`,
    })
    success = response.success
    message = response.message
  }
  catch (error: any) {
    message = error.data.message
  }
  loading.value = false

  confirmDelete.value = false
  nuxt.$notify(success, message)
  selectedId = 0
  tableRef.value.requestServerInteraction()
}

async function cancelItem() {
  loading.value = true
  let response = null as any
  let success = false
  let message = ''
  try {
    response = await nuxt.$fetcher({
      method: 'POST',
      url: `${defaultProps.module}/${selectedId}`,
    })
    success = response.success
    message = response.message
  }
  catch (error: any) {
    message = error.data.message
  }
  loading.value = false

  confirmCancel.value = false
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
  onRequest({ pagination: pagination.value, filter: filter.value })
}

defineExpose({
  reload,
})

async function onRequest(props: { pagination: { page: any; rowsPerPage: any; sortBy: any; descending: any }; filter: any }) {
  loading.value = true

  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter
  const startRow = (page - 1) * rowsPerPage

  let url = defaultProps.module

  // Populate start, length, search value
  url += `?start=${startRow}&length=${rowsPerPage}&search[value]=${filter}`

  // Populate
  url += defaultProps.columns?.filter(col => col.field).map((col, index) => `&columns[${index}][data]=${col.field}&columns[${index}][name]=${col.name}&columns[${index}][searchable]=${col?.searchable ? `${col.searchable}` : 'true'}`).join('')

  let sortByQuery = '&order[0][column]=0&order[0][dir]=desc'
  // Build Sort By
  if (sortBy) {
    const findIndex = defaultProps.columns?.findIndex(col => col.field === sortBy)
    if (findIndex !== -1 && findIndex >= 0)
      sortByQuery = `&order[0][column]=${findIndex}&order[0][dir]=${descending ? 'desc' : 'asc'}`
  }

  url += sortByQuery

  if (defaultProps.params)
    url += defaultProps.params

  try {
    const resp = await nuxt.$fetcher({ url, withWarehouseId: defaultProps.withWarehouseId }) as IAPIResponse
    if (resp.success) {
      const data = resp.data.data
      rows.value.splice(0, rows.value.length, ...data)
      pagination.value.rowsNumber = resp.data.recordsTotal
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    }
  }
  catch (error: any) {
    if (error.data?.message === 'Unauthenticated.') {
      // TO-DO: Clear cookie

      nuxt.$notify(false, error.data?.message)
      navigateTo('/')
    }
  }

  loading.value = false
}

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction()
})

function onRowClick(evt: any, row: any, index: number): void {
  if (!!defaultProps.module && defaultProps.hasDetailButton && nuxt.$hasAccess(`${permissionView} ${module}`)) {
    nuxt.$navigate(defaultProps.subModule ? `${route.path}/${defaultProps.subModule}/${row.id}` : `${route.path}/${row.id}`)
  }
}
</script>

<template>
  <q-table
    ref="tableRef"
    v-model:pagination="pagination"
    dense
    :rows="rows"
    :columns="columns"
    row-key="id"
    :filter="filter"
    :loading="loading"
    :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')"
    @row-click="onRowClick"
    @request="onRequest">
    <template v-slot:top>
      <div class="box-title-table"><span class="title-table">{{ title }}</span></div>
      <q-btn v-if="!!module && hasCreateButton && $hasAccess(`${permissionCreate} ${module}`)" color="primary" :to="customCreateFunction ? null : subModule ? `${route.path}/${subModule}/create` : `${route.path}/create`" @click="customCreateFunction ? $emit('customCreateFunction') : null" :label="$getTranslation('shared.buttons.create')" />

      <q-space />
      <q-input v-model="filter" filled borderless dense debounce="300" :placeholder="$getTranslation('shared.inputs.search')">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #body-cell-actions="props">
      <q-td :props="props">
        <q-btn v-if="!!module && hasDetailButton && $hasAccess(`${permissionView} ${module}`)" dense round flat color="black" :to="subModule ? `${route.path}/${subModule}/${props.row.id}` : `${route.path}/${props.row.id}`" icon="edit">
          <q-tooltip>{{ $getTranslation('shared.buttons.show') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="!!module && hasEditButton && $hasAccess(`${permissionUpdate} ${module}`)" dense round flat color="secondary" :to="subModule ? `${route.path}/${subModule}/${props.row.id}/edit` : `${route.path}/${props.row.id}/edit`" icon="edit">
          <q-tooltip>{{ $getTranslation('shared.buttons.edit') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="hasReturnSaleButton" dense round flat color="orange" icon="west" :to="`${route.path}/${props.row.id}/returns/${props.row.sale_return_id ? `${props.row.sale_return_id}/edit`: 'create'}`">
          <q-tooltip>{{ $getTranslation('shared.buttons.return') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="returnSaleDetailButton" dense round flat color="black" icon="edit" :to="`${route.path.replace('-return', '')}/${props.row.sale_id}/returns/${props.row.id}`">
            <q-tooltip>{{ $getTranslation('shared.buttons.show') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="returnSaleEditButton" dense round flat color="secondary" icon="edit" :to="`${route.path.replace('-return', '')}/${props.row.sale_id}/returns/${props.row.id}/edit`">
          <q-tooltip>{{ $getTranslation('shared.buttons.edit') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="hasReturnPurchaseButton" dense round flat color="orange" icon="east" :to="`${route.path}/${props.row.id}/returns/${props.row.purchase_return_id ? `${props.row.purchase_return_id}/edit` : 'create'}`">
          <q-tooltip>{{ $getTranslation('shared.buttons.return') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="returnPurchaseDetailButton" dense round flat color="black" icon="edit" :to="`${route.path.replace('-return', '')}/${props.row.purchase_id}/returns/${props.row.id}`">
            <q-tooltip>{{ $getTranslation('shared.buttons.show') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="returnPurchaseEditButton" dense round flat color="secondary" icon="edit" :to="`${route.path.replace('-return', '')}/${props.row.purchase_id}/returns/${props.row.id}/edit`">
          <q-tooltip>{{ $getTranslation('shared.buttons.edit') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="hasDeleteButton && $hasAccess(`${permissionDelete} ${module}`)" dense round flat color="negative" icon="delete" @click="openConfirmDeleteDialog(props.row.id)">
          <q-tooltip>{{ $getTranslation('shared.buttons.delete') }}</q-tooltip>
        </q-btn>
        <q-btn v-if="hasCancelButton" dense round flat color="negative" icon="cancel" @click="openConfirmCancelDialog(props.row.id)">
          <q-tooltip>{{ $getTranslation('shared.buttons.cancel') }}</q-tooltip>
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
        <q-btn v-if="hasCustomButton" dense color="primary" @click="$emit('customButtonClick', props.row)">
          {{ props.col.label }}
        </q-btn>
      </q-td>
    </template>
    <template #body-cell-children="props">
      <q-td :props="props">
        <q-btn color="primary" :to="`${route.path}/${props.value}`">
          {{ props.col.label }}
        </q-btn>
      </q-td>
    </template>
  </q-table>

  <!-- Delete Dialog -->
  <q-dialog v-model="confirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <span class="q-ml-sm">{{ $getTranslation('shared.labels.confirmDelete') }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$getTranslation('shared.buttons.cancel')" color="primary" @click="confirmDelete = !confirmDelete" :loading="loading" />
        <q-btn flat :label="$getTranslation('shared.buttons.confirm')" color="negative" @click="deleteItem" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Cancel Dialog -->
  <q-dialog v-model="confirmCancel" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <span class="q-ml-sm">{{ $getTranslation('shared.labels.confirmCancel') }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$getTranslation('shared.buttons.cancel')" color="primary" @click="confirmCancel = !confirmCancel" :loading="loading" />
        <q-btn flat :label="$getTranslation('shared.buttons.confirm')" color="negative" @click="cancelItem" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
