<script setup lang="ts">
const saleItem = useSaleItemStore()
const rule = useRule()

export interface ISendItem {
  id: number
  item_name: string
  item_code: string
  unit_name: string
  warehouse_name: string
  outstanding_quantity: number
}

function openDialog(sendItem: ISendItem) {
  itemDetail.value = {
    item_name: sendItem.item_name,
    item_code: sendItem.item_code,
    unit_name: sendItem.unit_name,
    warehouse_name: sendItem.warehouse_name,
    outstanding_quantity: sendItem.outstanding_quantity,
  }
  saleItem.sendSaleItemForm.sale_item_id = sendItem.id
  sendItemDialog.value = true
}
const sendItemDialog = ref(false)

const itemDetail = ref({
  item_name: '',
  item_code: '',
  unit_name: '',
  warehouse_name: '',
  outstanding_quantity: 0
})

defineExpose({
  openDialog
})

const emit = defineEmits(['success'])

async function submit() {
  const response = await saleItem.submitForm()
  if (response === true) {
    sendItemDialog.value = false
  }

  emit('success')
}
</script>
<template>
<!-- Send Sale Item Dialog -->
<q-dialog v-model="sendItemDialog">
  <q-card>
    <q-card-section>
      <table class="w-100">
        <tr>
          <td><b>{{ $getTranslation('shared.columns.id') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ saleItem.sendSaleItemForm.sale_item_id }}</td>
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
          <td><b>{{ $getTranslation('shared.columns.warehouse') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ itemDetail.warehouse_name }}</td>
        </tr>
        <tr>
          <td><b>{{ $getTranslation('shared.columns.outstandingQuantity') }}</b></td>
          <td>:</td>
          <td class="text-right">{{ itemDetail.outstanding_quantity }}</td>
        </tr>
      </table>
      <hr class="my-5">
      <q-form @submit="submit()" @reset="saleItem.resetForm()" @validation-error="$formValidationError">
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber, (val: number) => rule.maxQuantity(val, itemDetail.outstanding_quantity)]" :label="$getTranslation('shared.columns.receivedQuantity')"
          v-model="saleItem.sendSaleItemForm.sent_quantity" />
        <forms-action-button :loading="saleItem.loading" class="mb-5" />
      </q-form>
    </q-card-section>
  </q-card>
</q-dialog>

</template>