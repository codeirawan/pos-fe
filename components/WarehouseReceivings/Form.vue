<script setup lang="ts">
const module = 'warehouse-receivings'
const warehouseReceiving = useWarehouseReceivingStore()
const rule = useRule()
const supplier = useSupplierStore()
const warehouse = useWarehouseStore()
const item = useItemStore()

await supplier.getAll()
await warehouse.getAll()

onNuxtReady(() => {
  warehouseReceiving.getDetail()
})

function filterItem(supplierId: number) {
  if (supplierId) {
    item.getAllBySupplierId(supplierId)
  }
  warehouseReceiving.filterItem(supplierId)
  item.filterItem(supplierId)
}

</script>

<template>
  <forms-breadcumb class="q-mr-md" :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md">
    <q-form @submit="warehouseReceiving.submitForm" @reset="warehouseReceiving.resetForm" @validation-error="$formValidationError" class="q-gutter-md">
      <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.supplier')" v-model="warehouseReceiving.warehouseReceivingForm.supplier_id" option-label="supplier_store_name" :options="supplier.suppliers" @update:model-value="filterItem(warehouseReceiving.warehouseReceivingForm.supplier_id ?? 0)"/>
      <warehouse-receivings-item-table :items="item.items" />
      <forms-action-button :loading="warehouseReceiving.loading" />
    </q-form>
  </div>
</template>