<script setup lang="ts">
import { ref } from 'vue'
import { useOnlineStore } from '~/composables/online'
import { version } from '~/package.json'

const nuxt = useNuxtApp()
const route = useRoute()
const menus = ref(useMenu())
const leftDrawerOpen = ref(false)
const { status, data, signOut } = useAuth()

const store = useOnlineStore()

const syncInterval = ref(store.getTimeSync)

const showToolbarTitle = ref(menus.value?.length > 1)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function showDrawer() {
  if (route.params.store_id || route.params.warehouse_id || showToolbarTitle.value)
    return true

  return false
}

const isOnline = ref(store.online)
const showBanner = ref(false)
const authData = data.value
const list = ref([] as any)

const idStoreRouter = route.params.store_id ?? '0'
const idStoreStorage = store.idStore

const selectedStore = ref(store.getIdStore)

watch(() => store.online, (val) => {
  isOnline.value = val
  showBanner.value = true

  if (val === true) {
    setTimeout(() => {
      showBanner.value = false
    }, 5000)
  }
})

watchEffect(async () => {
  list.value = nuxt.$getActiveModule() === 'stores' ? (authData?.stores ?? []) : (nuxt.$getActiveModule() === 'warehouses' ? (authData?.warehouses ?? []) : [])
  menus.value = useMenu()
  showToolbarTitle.value = menus.value?.length > 1
})

watch(selectedStore, (newvalue: any, oldvalue: any) => {
  if (oldvalue === undefined) return false
  let id = ''
  if (typeof newvalue === 'object' && !Array.isArray(newvalue) && newvalue !== null)
    id = newvalue.id
  else
    id = newvalue

  if (id && newvalue && (route.params.store_id || route.params.warehouse_id)) {
    if (id !== route.params.store_id || id !== route.params.warehouse_id) {
      store.setIdstore(parseInt(id))
      if (route.params.store_id) {
        nuxt.$clearDB().then(() => {
          useSynchron(parseInt(id))
        })
        nuxt.$navigate(`stores/${id}/dashboard`)
        nuxt.$notify(true, nuxt.$getTranslation('shared.notifications.storeChanged'), 'bottom')
      } else if (route.params.warehouse_id) {
        nuxt.$navigate(`warehouses/${id}/dashboard`)
        nuxt.$notify(true, nuxt.$getTranslation('shared.notifications.warehouseChanged'), 'bottom')
      }
    }
  }
}, { deep: true, immediate: true })

watch(syncInterval, (newValue: number) => {
  store.setTimeSync(newValue)
})
function isAuthenticated(): boolean {
  return status.value === 'authenticated'
}

async function logout() {
  navigateTo('/')
  nuxt.$notify(true, nuxt.$getTranslation('shared.notifications.logoutSuccess'))
  try {
    await signOut({ callbackUrl: '/login', redirect: true })
    nuxt.$clearDB()
    store.clear()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-banner v-if="showBanner" inline-actions :class="isOnline ? 'bg-green text-white' : 'bg-red text-white'">
        <span v-if="!isOnline"> You have lost connection to the internet. This app is offline.</span>
        <span v-else> Your connection is online.</span>
      </q-banner>
      <q-toolbar>
        <q-btn v-if="showDrawer()" flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title v-if="isAuthenticated()">{{ showToolbarTitle ?
          $getTranslation(`navigation.${$getActiveModule()}`) + ` v${version}` : '' }}</q-toolbar-title>

        <!-- INTENDED COMMENT: SYNC INTERVAL FOR AUTO BACKUPS -->
        <!-- <q-input v-if="isAuthenticated()" v-model="syncInterval" type="number" min="0" filled dark style="width: 100px; margin-right: 20px">
          <template #prepend>
            <q-icon name="loop" />
          </template>
        </q-input> -->

        <!-- Stores/Warehouses Dropdown -->
        <forms-select v-if="isAuthenticated() && showToolbarTitle && list.length > 0" v-model="selectedStore"
          :label="$getTranslation(`navigation.${$getActiveModule()}`)" class="text-white" filled :options="list"
          option-value="id" option-label="name" :clearable="false" :dark="true" />
        <q-btn v-if="isAuthenticated()" flat dense round icon="logout" class="ml-3" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="showDrawer()" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list v-for="menu in menus" :key="menu.title">
        <q-expansion-item v-model="menu.active" :icon="menu.icon" :header-inset-level="0.2" :label="menu.title"
          :to="$getLocalePath(menu.link)" :hide-expand-icon="!menu.children || menu.children.length === 0">
          <q-expansion-item v-if="menu.children && menu.children.length > 0" v-for="child in menu.children"
            v-model="child.active" :header-inset-level="0.4" :icon="child.icon" :label="child.title"
            :to="$getLocalePath(child.link)" :hide-expand-icon="!child.children || child.children.length === 0">
            <q-expansion-item v-if="child.children && child.children.length > 0" v-for="grandChild in child.children"
              :header-inset-level="0.8" :icon="grandChild.icon" :label="grandChild.title"
              :to="$getLocalePath(grandChild.link)" hide-expand-icon>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-lg">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
