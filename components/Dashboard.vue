<script setup lang="ts">
const menus = ref(useMenu())

watchEffect(async () => {
  menus.value = useMenu()
})
</script>

<template>
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
</template>
