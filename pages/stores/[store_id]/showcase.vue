<script setup lang="ts">
import { QBtnProps, QNotifyOptions, useQuasar } from 'quasar'

const { dialog, bottomSheet, loading, loadingBar, notify, dark, screen } =
  useQuasar()

loadingBar.setDefaults({
  color: 'green',
  size: '15px',
  position: 'bottom',
})

const themeIcon = computed(() => (dark.isActive ? 'dark_mode' : 'light_mode'))

const showBottomsheet = () =>
  bottomSheet({
    message: 'Bottom Sheet',
    actions: [
      {
        label: 'Drive',
        img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
        id: 'drive',
      },
      {
        label: 'Keep',
        img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
        id: 'keep',
      },
      {
        label: 'Google Hangouts',
        img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
        id: 'calendar',
      },
      {
        label: 'Calendar',
        img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
        id: 'calendar',
      },
    ],
  })

const random = <T extends string>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)]

type Position = Exclude<QNotifyOptions['position'], undefined>

const buttons: QBtnProps[] = [
  {
    label: 'Bottomsheet',
    onClick: () => showBottomsheet(),
  },
  {
    label: 'Loading',
    onClick: () => {
      loading.show()
      setTimeout(() => {
        loading.hide()
      }, 1000)
    },
  },
  {
    label: 'LoadingBar',
    onClick: () => {
      loadingBar.start()
      setTimeout(() => {
        loadingBar.stop()
      }, 1000)
    },
  },
  {
    label: 'Dialog',
    onClick: () => dialog({ message: 'Hello World' }),
  },
  {
    label: 'Notify',
    onClick: () =>
      notify({
        message: 'Hello World',
        position: random<Position>([
          'left',
          'right',
          'center',
          'bottom',
          'top',
        ]),
      }),
  },
]

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: { name: any }) => row.name,
    format: (val: any) => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
</script>
<template>
  <div>
    <p>Table</p>
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
    <div class="q-pa-md">
    </div>

    <p class="text-h6 q-pt-md">Plugin Showcase</p>
    <q-list>
      <q-item v-for="(button, idx) in buttons" :key="idx">
        <q-btn color="primary" v-bind="button" />
      </q-item>
      <q-item>
        <q-toggle :model-value="dark.isActive" checked-icon="dark_mode" unchecked-icon="light_mode" size="3rem"
          @update:model-value="(val) => dark.set(val)" />
      </q-item>
    </q-list>
  </div>
</template>
