<script setup lang="ts">
import IWarehouseReceivingFormItem from '~/interfaces/WarehouseReceivings/IWarehouseReceivingFormItem'
const nuxt = useNuxtApp()
const tableColumn = useTableColumn()
const rule = useRule()
const filter = ref('')
const purchaseItemDialog = ref(false)
const notifError = ref(false)
const submitStatus = ref(true)
const purchase = usePurchaseStore()
const itemDetail = ref({
  item_name: '',
  item_code: '',
  unit_name: '',
  outstanding_quantity: 0
})
const emit = defineEmits(['success'])

function openDialog(receiveItem: IWarehouseReceivingFormItem, warehouse_id: number) {
  itemDetail.value = {
    item_name: receiveItem.item_name,
    item_code: receiveItem.item_code,
    unit_name: receiveItem.unit_name,
    outstanding_quantity: receiveItem.outstanding_quantity,
  }
  purchase.getItem(receiveItem.item_id, receiveItem.id, warehouse_id)
  purchaseItemDialog.value = true
}

defineExpose({
  openDialog
})

function checkTotal() {
  const sum = purchase.purchaseItems.reduce((accumulator, object) => {
    return accumulator + parseInt(object.receiving_quantity);
  }, 0);
  notifError.value = false;
  if (itemDetail.value.outstanding_quantity < sum) {
    notifError.value = true;
  }
}

async function submit() {
  if (purchase.purchaseItems.filter(n => n.receiving_quantity > 0).length == 0) {
    nuxt.$notify(false, nuxt.$getTranslation('shared.labels.qtyEmpty'))
  } else {
    if (submitStatus.value) {
      submitStatus.value = false
      const response = await purchase.submitReceivingItem()
      if (response === true) {
        purchaseItemDialog.value = false
        emit('success')
      }
      submitStatus.value = true
    }
  }
}

</script>
<template>
  <!-- Item Price Update Dialog -->
  <q-dialog v-model="purchaseItemDialog">
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <table class="w-100 m-auto">
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
        <q-table class="mx-0 purchase-item" :class="notifError && 'error'" bordered dense :rows="purchase.purchaseItems"
          :columns="tableColumn.adminReceivingPurchaseItemsTable" row-key="name" :filter="filter"
          :no-results-label="$getTranslation('shared.labels.noSearchResut')">
          <template v-slot:top>
            <div class="box-title-table"><span class="title-table">{{ $getTranslation('shared.labels.list') + ' ' +
              $getTranslation('shared.columns.item') + ' ' + $getTranslation('modules.purchases.title') }}</span></div>
            <q-space />
            <q-input filled borderless dense debounce="300" v-model="filter"
              :placeholder="$getTranslation('shared.inputs.search')">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-received_quantity="props">
            <q-td :props="props" style="max-width: 70px">
              <forms-input
                :rules="[rule.nonNegativeNumber, (val: number) => rule.maxQuantity(val, parseInt(props.row.outstanding_quantity))]"
                v-model="props.row.receiving_quantity" type="number" @keyup="checkTotal()" />
            </q-td>
          </template>
        </q-table>
        <div class="m-auto flex mt-2"><q-chip v-if="notifError" square color="red" text-color="white"
            :label="$getTranslation('shared.labels.qtyReceivingMaxValue')" class="m-auto" /></div>
        <hr class="my-5">
        <div class="float-right mb-4">
          <q-btn :label="$getTranslation('shared.buttons.submit')" type="submit" color="positive" :disable="notifError"
            @click="submit()" />
          <q-btn :label="$getTranslation('shared.buttons.reset')" type="reset" color="secondary" flat class="q-ml-sm" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.search-item-dialog {
  width: auto !important;
  max-width: 100% !important;
}

.purchase-item.error td:last-child {
  background-color: #fd6969
}
</style>