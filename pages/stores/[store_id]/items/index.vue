<script setup lang="ts">
import { useOnlineStore } from '~/composables/online'

const store = useOnlineStore()
const route = useRoute()

const loading = ref(true)
const isSync = ref(false)
const tableIndex = ref()
const isOnline = ref(store.online)

let idStore_ = route.params.store_id
let idStore = 0
if (idStore_) {
  idStore_ = idStore_.toString()
  idStore = parseInt(idStore_)
}

async function synchronousData() {
  if (isOnline.value) {
    loading.value = true
    isSync.value = true
    try {
      await useSynchronItems(idStore)
      loading.value = false
      await useSynchronBasePrices(idStore)
      useSynchronSellItems(idStore)
    }
    catch (e) {
    }
    finally {
      isSync.value = false
    }
  }
  else {
    loading.value = false
  }
}

const module = 'items'
const tableColumn = useTableColumn()

watch(() => store.online, (val) => {
  isOnline.value = val
})

onMounted(async () => {
  return false
  await synchronousData()
})
</script>

<template>
  <div>
    <items-table />

    <!-- OFFLINE MODE TEMPORARY DISABLE -->
    <!-- <div class="row justify-between">
      <div class="col text-right">
        <q-badge v-if="isSync" color="green" outline>
          <q-spinner-hourglass
            color="green"
            size="1em"
          /> Synchronous
        </q-badge>
      </div>
    </div>
    <forms-data-table-indexdb
      ref="tableIndex"
      :columns="tableColumn.itemsTable" :module="module" :loading="loading" @load="synchronousData"
      :title="$getTranslation(`modules.items.title`)"
    /> -->
  </div>
</template>
