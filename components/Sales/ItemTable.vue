<script setup lang="ts">
import IItemSellPrice from '~/interfaces/Items/IItemSellPrice'
import ISaleFormItem from "~/interfaces/Sales/ISaleFormItem"

const nuxt = useNuxtApp()
const sale = useSaleStore()
const tableColumn = useTableColumn()
const rule = useRule()
const filter = ref('')
const historyItemDialog = ref(false)
const searchItemDialog = ref(false)
const isCountdownActive = ref<boolean>(true);
var result = ref(10)

async function addItem(item: IItemSellPrice) {
  sale.addItem(item)
  searchItemDialog.value = !searchItemDialog.value
}

function setSelectedUnitName(item: ISaleFormItem, rowIndex: number) {
  const itemUnit = item.item_units.find(n => n.item_id == item.item_id && n.unit_id == item.selected_unit_id)
  if (itemUnit) {
    item.selected_unit_name = itemUnit.name
    item.quantity = itemUnit.quantity
    item.selected_base_quantity = itemUnit.quantity
  }
  calculateDiscount('percentage', rowIndex)
}

function removeItem(item: ISaleFormItem) {
  sale.removeItem(item)
}

function calculateDiscount(type: string, index: number) {
  let item = sale.saleForm.items[index]
  sale.saleForm.items[index].quantity = (item.selected_quantity ?? 0) * (item.selected_base_quantity ?? 0) || (item.selected_base_quantity ?? 0)
  item = sale.saleForm.items[index]
  const price = item.quantity * item.sell_price
  if (type == 'value') {
    sale.saleForm.items[index].discount_percentage = 100 / (price / (item.discount_value ?? 0))
  } else  {
    if (item.discount_percentage) {
      sale.saleForm.items[index].discount_value = (item.discount_percentage / 100) * price
    } else {
      sale.saleForm.items[index].discount_value = null
    }
  }
  sale.saleForm.items[index].sub_total_price = price - (sale.saleForm.items[index].discount_value ?? 0)
  sale.saleForm.items[index].tax = sale.saleForm.items[index].sub_total_price * nuxt.$taxPercentage() / 100
  sale.saleForm.items[index].total_price = sale.saleForm.items[index].sub_total_price + sale.saleForm.items[index].tax
}

function requestOtp() {
  sale.submitRequestOtp()
  countdown()
}

const resendOtp = () => {
  if (isCountdownActive.value == false) {
    sale.submitRequestOtp(1)
    countdown()
  }
}

function countdown() {
  result.value = 10

  isCountdownActive.value = true;

  const intervalId = setInterval(() => {
    if (result.value > 0) {
      result.value--;
    } else {
      clearInterval(intervalId);
      isCountdownActive.value = false;
    }
  }, 1000);
}

function showHistoryItem(item_id: number) {
  sale.saleForm.item_id_history = item_id
  historyItemDialog.value = true
}
</script>
<template>
  <q-table bordered class="mx-0" dense :rows="sale.saleForm?.items" :columns="tableColumn.saleItemsTable" row-key="name"
    :filter="filter" :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <b>{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item') }}</b>
      <q-space />
      <q-btn color="primary" @click="searchItemDialog = !searchItemDialog" :label="$getTranslation('shared.buttons.add')" />
    </template>
    <template v-slot:body-cell-unit_name="props">
      <q-td :props="props">
        <forms-select :label="props.row.selected_unit_id && props.row.unit_id != props.row.selected_unit_id ? parseInt(props.row.quantity) + ' ' + props.row.unit_name : ''" v-model="props.row.selected_unit_id" :options="props.row.item_units" optionValue="unit_id" @update:model-value="setSelectedUnitName(props.row, props.rowIndex)" :clearable="false" style="width: 112px" v-if="!props.row.loading" />
      </q-td>
    </template>
    <template v-slot:body-cell-quantity="props">
      <q-td :props="props">
        <q-input class="pb-0" type="number" dense filled :rules="[rule.positiveNumber]" v-model="sale.saleForm.items[props.rowIndex].selected_quantity" @keyup="calculateDiscount('percentage', props.rowIndex)" @change="calculateDiscount('percentage', props.rowIndex)" style="min-width: 80px" />
      </q-td>
    </template>
    <template v-slot:body-cell-discount_percentage="props">
      <q-td :props="props">
        <q-input class="pb-0" type="number" step=".01" pattern="^\d*(\.\d{0,2})?$" dense filled :rules="[rule.nonNegativeNumber, (val: number) => rule.maxDiscount(val)]" v-model="sale.saleForm.items[props.rowIndex].discount_percentage" @keyup="calculateDiscount('percentage', props.rowIndex)" @change="calculateDiscount('percentage', props.rowIndex)" max="99" style="min-width: 110px">
          <template v-slot:append>
            <q-icon name="percent" size="sm" />
          </template>
        </q-input>
      </q-td>
    </template>
    <template v-slot:body-cell-discount_value="props">
      <q-td :props="props">
        <q-input class="pb-0" type="number" step=".01" pattern="^\d*(\.\d{0,2})?$" dense filled :rules="[rule.positiveNumber, (val: number) => rule.max(val, props.row.quantity * props.row.sell_price)]" v-model="sale.saleForm.items[props.rowIndex].discount_value" @keyup="calculateDiscount('value', props.rowIndex)" @change="calculateDiscount('value', props.rowIndex)" style="min-width: 120px" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat icon="history" @click="showHistoryItem(props.row.item_id)">
          <q-tooltip>{{ $getTranslation('shared.buttons.history') }}</q-tooltip>
        </q-btn>
        <q-btn dense round flat color="negative" icon="delete" @click="removeItem(props.row)">
          <q-tooltip>{{ $getTranslation('shared.buttons.delete') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>

  <!-- Search Item Dialog -->
  <q-dialog v-model="searchItemDialog">
    <q-card class="search-item-dialog">
      <q-card-section class="row items-center">
        <forms-data-table :title="$getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.itemStockPricesTable" :module="`item-stocks`" :hasCreateButton="false" @addButton="addItem"></forms-data-table>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Search History Item Dialog -->
  <q-dialog v-model="historyItemDialog">
    <q-card class="search-item-dialog">
      <q-card-section class="row items-center">
        <forms-data-table :title="$getTranslation('shared.buttons.history') + ' ' + $getTranslation('modules.sales.title') + ' ' + $getTranslation('shared.columns.item')" :columns="tableColumn.saleItemHistoriesTable" :module="`sale-items/${sale.saleForm.item_id_history}/customer/${sale.saleForm.customer_id || null}`" :hasCreateButton="false" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Request OTP Dialog -->
  <q-dialog v-model="sale.saleForm.requestOtpModal">
    <q-card style="width: 400px; max-width: 80vw;">
      <q-card-section>
        <b>{{ $getTranslation('shared.labels.request') }} {{ $getTranslation('shared.columns.otp') }}</b>
        <hr class="my-3">
        <div class="doc-note">
          {{ $getTranslation('shared.labels.oneItemPriceCheaper') }}
        </div>
        <q-form @submit="requestOtp()" @validation-error="$formValidationError">
          <q-btn class="float-right mt-3 mb-5" :label="$getTranslation('shared.buttons.send')" type="submit" color="positive"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Send OTP Dialog -->
  <q-dialog v-model="sale.saleForm.verificationOtpModal">
    <q-card style="width: 400px; max-width: 80vw;">
      <q-card-section>
        <b>{{ $getTranslation('shared.labels.verify')}} {{ $getTranslation('shared.columns.otp') }}</b>
        <hr class="my-3">
        <q-form @submit="sale.submitVerificationOtp" @validation-error="$formValidationError">
          <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.otp')"
            v-model="sale.saleForm.otp_code" class="text-uppercase" maxlength="5"/>
          <div>
            <label>{{ $getTranslation('shared.labels.timeRemaining') }}: 00:{{ result < 10 ? '0'+result : result }}</label>
            <label class="float-right text-underline" :class="isCountdownActive ? 'cursor-not-allowed text-weight-thin' : 'cursor-pointer'" @click="resendOtp">{{ $getTranslation('shared.labels.resend') }} {{ $getTranslation('shared.columns.otp') }}</label>
          </div>
          <forms-action-button :has-reset-button="false" class="mt-3 mb-5" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.search-item-dialog {
  width: auto !important;
  max-width: 100% !important;
}
.doc-note {
  background-color: #fdf6e1;
  border-color: #c3920d;
  font-size: 12px;
  border-radius: 4px;
  margin: 16px 0;
  padding: 16px;
  border-width: 1px;
  border-style: solid;
}
.text-underline {
  text-decoration: underline;
}
</style>