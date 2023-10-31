<script setup lang="ts">
const route = useRoute()
export interface IBreadcumb {
  module: string
  module2?: string
  module3?: string
  title: string
  title2?: string
  title3?: string
  page: string
  page2?: string
}

withDefaults(defineProps<IBreadcumb>(), {
  module: '',
  module2: '',
  module3: '',
  title: '',
  title2: '',
  title3: '',
  page: '',
  page2: '',
})

const form = route.path.includes("create") ? 'Tambah' : 'Ubah'
</script>

<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el :label="title" :to="`${route.path.split(module)[0]}${module}`"/>
    <q-breadcrumbs-el v-if="module2" :label="title2" :to="`${route.path.split('/'+module2)[0]}${page2 == 'table' ? module2 : ''}`"/>
    <q-breadcrumbs-el v-if="module3" :label="title3" :to="route.path.split('/'+module3)[0]"/>
    <q-breadcrumbs-el :label="page == 'form' ? form : page"/>
  </q-breadcrumbs>
</template>

<style>
.q-breadcrumbs .q-gutter-sm {
  padding-bottom: 5px;
  border-radius: 2px;
}
.q-breadcrumbs {
  background: #f2f2f2;
  padding-left: 10px;
  margin-bottom: 20px;
}
</style>