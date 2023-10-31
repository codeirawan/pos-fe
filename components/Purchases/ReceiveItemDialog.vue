<script setup lang="ts">
const purchaseItem = usePurchaseItemStore()
const warehouse = useWarehouseStore()
const rule = useRule()

export interface IReceiveItem {
  id: number
  item_name: string
  item_code: string
  unit_name: string
  outstanding_quantity: number
}

function openDialog(receiveItem: IReceiveItem) {
  itemDetail.value = {
    item_name: receiveItem.item_name,
    item_code: receiveItem.item_code,
    unit_name: receiveItem.unit_name,
    outstanding_quantity: receiveItem.outstanding_quantity,
  }
  purchaseItem.purchaseItemForm.purchase_item_id = receiveItem.id
  receiveItemDialog.value = true
}
const receiveItemDialog = ref(false)

const itemDetail = ref({
  item_name: '',
  item_code: '',
  unit_name: '',
  outstanding_quantity: 0
})

defineExpose({
  openDialog
})

onNuxtReady(() => {
  warehouse.getAll()
})

const emit = defineEmits(['success'])

async function submit() {
  const response = await purchaseItem.submitForm()
  if (response === true) {
    receiveItemDialog.value = false
  }

  emit('success')
}
</script>
<template>

<!-- Item Price Update Dialog -->
<q-dialog v-model="receiveItemDialog">
  <q-card>
    <q-card-section>
      <table class="w-100">
        <tr>
          <td><b>{{ $getTranslation('shared.columns.id') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ purchaseItem.purchaseItemForm.purchase_item_id }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.item') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ itemDetail.item_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.code') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ itemDetail.item_code }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.unit') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ itemDetail.unit_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.outstandingQuantity') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ itemDetail.outstanding_quantity }}</td>
        </tr>
      </table>
      <hr class="my-5">
      <q-form @submit="submit()" @reset="purchaseItem.resetForm()" @validation-error="$formValidationError">
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.receivedQuantity')"
          v-model="purchaseItem.purchaseItemForm.received_quantity" />
        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.warehouse')"
        v-model="purchaseItem.purchaseItemForm.warehouse_id" :options="warehouse.warehouses" />
        <forms-action-button :loading="purchaseItem.loading" class="mb-5" />
      </q-form>
    </q-card-section>
  </q-card>
</q-dialog>

</template>