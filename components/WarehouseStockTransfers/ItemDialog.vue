<script setup lang="ts">
import IWarehouseStockTransferItem from '~/interfaces/WarehouseStockTransfers/IWarehouseStockTransferItem'
const warehouse = useWarehouseStore()
const warehouseStockTransfer = useWarehouseStockTransferStore()
const rule = useRule()
const submitStatus = ref(true)

function openDialog(receiveItem: IWarehouseStockTransferItem) {
  warehouseStockTransfer.warehouseStockTransferItem = receiveItem
  warehouseStockTransfer.warehouseStockTransferItem.warehouse_old_id = warehouseStockTransfer.warehouseStockTransferItem.warehouse_id
  warehouseStockTransfer.warehouseStockTransferItem.warehouse_id = null
  itemDialog.value = true
}
const itemDialog = ref(false)

defineExpose({
  openDialog
})

onNuxtReady(() => {
  warehouse.getAll()
})

const emit = defineEmits(['success'])

async function submit() {
  if (submitStatus.value) {
    submitStatus.value = false
    const response = await warehouseStockTransfer.submitForm()
    if (response === true) {
      itemDialog.value = false
      emit('success')
    }
    submitStatus.value = true
  }
}
</script>
<template>

<!-- Item Price Update Dialog -->
<q-dialog v-model="itemDialog">
  <q-card>
    <q-card-section>
      <table class="w-100">
        <tr>
          <td><b>{{ $getTranslation('shared.columns.item') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ warehouseStockTransfer.warehouseStockTransferItem.item_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.code') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ warehouseStockTransfer.warehouseStockTransferItem.item_code }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.purchasePrice') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ warehouseStockTransfer.warehouseStockTransferItem.purchase_price }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.warehouse') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ warehouseStockTransfer.warehouseStockTransferItem.warehouse_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.currentStock') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ warehouseStockTransfer.warehouseStockTransferItem.stock }}</td>
        </tr>
      </table>
      <hr class="my-5">
      <q-form @submit="submit()" @reset="warehouseStockTransfer.resetForm()" @validation-error="$formValidationError">
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber, (val: number) => rule.maxQuantity(val, parseInt(warehouseStockTransfer.warehouseStockTransferItem.stock))]" :label="$getTranslation('shared.columns.quantity')" type="number"
          v-model="warehouseStockTransfer.warehouseStockTransferItem.quantity" />
        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.warehouse')"
        v-model="warehouseStockTransfer.warehouseStockTransferItem.warehouse_id" :options="warehouse.warehouses.filter(n => n.id != warehouseStockTransfer.warehouseStockTransferItem.warehouse_old_id)" />
        <forms-action-button :loading="warehouseStockTransfer.loading" class="mb-5" />
      </q-form>
    </q-card-section>
  </q-card>
</q-dialog>

</template>