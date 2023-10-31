<script setup lang="ts">
const { data } = useAuth()
const { stores, warehouses } = data.value
const storeComposable = useOnlineStore()

async function navigateStore(storeId: number) {
  storeComposable.setIdstore(storeId)
  await nextTick()
}
</script>

<template>
  <q-list bordered separator class="mb-2">
    <q-item clickable v-ripple :to="`/companies/stores`">
      <q-item-section class="text-uppercase">{{ $getTranslation('navigation.companies') }}</q-item-section>
    </q-item>
  </q-list>
  <div v-if="stores?.length > 0" class="mb-4">
    <p class="text-bold mb-1 text-uppercase">{{ $getTranslation('navigation.stores') }}</p>
    <q-list v-for="store in stores" bordered separator class="mb-2">
      <q-item clickable v-ripple :to="`/stores/${store.id}/dashboard`" @click="navigateStore(store.id)">
        <q-item-section>{{ store.name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-if="warehouses?.length > 0">
    <p class="text-bold mb-1 text-uppercase">{{ $getTranslation('navigation.warehouses') }}</p>
    <q-list v-for="warehouse in warehouses" bordered separator class="mb-2">
      <q-item clickable v-ripple :to="`/warehouses/${warehouse.id}/dashboard`">
        <q-item-section>{{ warehouse.name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
