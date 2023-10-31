<script setup lang="ts">
import IStockAdjustmentItem from 'interfaces/StockAdjustments/IStockAdjustmentItem'
const stockAdjustment = useStockAdjustmentStore()
const rule = useRule()
const submitStatus = ref(true)

function openDialog(receiveItem: IStockAdjustmentItem) {
  stockAdjustment.stockAdjustmentItem = receiveItem
  stockAdjustment.stockAdjustmentItem.stock_before = stockAdjustment.stockAdjustmentItem.stock
  itemDialog.value = true
}
const itemDialog = ref(false)

defineExpose({
  openDialog
})

const emit = defineEmits(['success'])

async function submit() {
  if (submitStatus.value) {
    submitStatus.value = false
    const response = await stockAdjustment.submitForm()
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
          <td class="text-right">{{ stockAdjustment.stockAdjustmentItem.item_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.code') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ stockAdjustment.stockAdjustmentItem.item_code }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.purchasePrice') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ stockAdjustment.stockAdjustmentItem.purchase_price }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.warehouse') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ stockAdjustment.stockAdjustmentItem.warehouse_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.currentStock') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ stockAdjustment.stockAdjustmentItem.stock }}</td>
        </tr>
      </table>
      <hr class="my-5">
      <q-form @submit="submit()" @reset="stockAdjustment.resetForm()" @validation-error="$formValidationError">
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.newStock')" type="number"
          v-model="stockAdjustment.stockAdjustmentItem.stock_after" />
        <forms-action-button :loading="stockAdjustment.loading" class="mb-5" />
      </q-form>
    </q-card-section>
  </q-card>
</q-dialog>

</template>