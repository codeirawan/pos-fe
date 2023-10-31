

<script setup lang="ts">
export interface IToggle {
  label?: string
  required?: boolean
  modelValue: number
}

withDefaults(defineProps<IToggle>(), {
  label: '',
})

const emit = defineEmits(['update:modelValue'])

function onUpdate(event: any) {
  emit('update:modelValue', event)
}
</script>

<template>
  <q-uploader :req="required ? 1 : 0" :label="label" multiple :modelValue="modelValue" @update:modelValue="onUpdate" @change:modelValue="onUpdate" @input:modelValue="onUpdate" />

  <q-uploader
    url="http://localhost:4444/upload"
    label="Custom header"
    multiple
    accept=".jpg, image/*"
    :max-files="3"
    max-file-size="2048000"
    @added="added"
  >
    <template v-slot:header="scope">
      <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
        <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
          <q-tooltip>Clear All</q-tooltip>
        </q-btn>
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"></q-spinner>
        <div class="col">
          <div class="q-uploader__title">Upload your files</div>
        </div>
        <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
          <q-uploader-add-trigger />
          <q-tooltip>Pick Files</q-tooltip>
        </q-btn>
      </div>
    </template>
  </q-uploader>
</template>

<script>
new Vue({
  el: '#q-app',
  data: () => ({
    file: null
  }),
  methods: {
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    added(file) {
      this.file = file[0]
    }
  }
})
</script>

https://codepen.io/metalsadman/pen/ZEepWEJ
https://codepen.io/dwarfhq/pen/JjKVvxe?editors=1111