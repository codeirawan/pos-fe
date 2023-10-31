<script setup lang="ts">
import VueBarcode from '@chenfengyuan/vue-barcode'

const module = 'items'
const itemWizard = useItemWizardStore()
const supplier = useSupplierStore()
const subCategory = useSubCategoryStore()
const unit = useUnitStore()
const rule = useRule()
const priceCategory = usePriceCategoryStore()
const warehouse = useWarehouseStore()
const nuxt = useNuxtApp()
const tableColumn = useTableColumn()
const selected = ref([])

onMounted(async () => {
  supplier.getAll()
  subCategory.getAll()
  unit.getAll()
  await priceCategory.getAll()
  await warehouse.getAll()

  itemWizard.priceCategories = priceCategory.priceCategories
  itemWizard.warehouses = warehouse.warehouses
  itemWizard.setInitialState()
})

function changeSupplier() {
  // Find Supplier
  const findSupplier = supplier.suppliers.find(sup => sup.id === itemWizard.itemFormWizard.supplier_id)
  if (findSupplier) {
    // Auto Assign Supplier Code
    itemWizard.itemFormWizard.code = findSupplier.code + nuxt.$padNumberWithZeros((findSupplier.total_item ?? 0) + 1)
  }
}

</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="form" />
  <div class="q-pa-md">
    <q-form @submit="itemWizard.submitForm" @reset="itemWizard.resetForm" class="q-gutter-md mb-10">
      <div class="row ml-0">
        <div class="col-12 col-sm-6 pr-2">
          <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.name')" v-model="itemWizard.itemFormWizard.name" :autofocus="true" />
          <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.category')"
          v-model="itemWizard.itemFormWizard.sub_category_id" :options="subCategory.subCategories" v-if="!subCategory.loading" />
          <forms-input :required="true" type="number" :rules="[rule.required]" :label="$getTranslation('shared.columns.stockAlert')"
          v-model="itemWizard.itemFormWizard.stock_alert" />
          <q-table bordered class="mx-0 inline-block" dense :rows="itemWizard.itemFormWizard.units" :columns="tableColumn.itemUnitsWizardTable" row-key="unit_id" :no-data-label="$getTranslation('shared.labels.noData')" :no-results-label="$getTranslation('shared.labels.noSearchResut')" :hide-pagination="true" :hide-bottom="true" selection="single" v-model:selected="itemWizard.itemUnit">
            <template v-slot:top>
              <div class="box-title-table">
                <span class="title-table">{{ $getTranslation(`modules.itemUnits.title`) }}</span>
                <q-btn class="float-right mr-4" color="primary" @click="itemWizard.addUnit()" :label="$getTranslation('shared.buttons.add')" />
              </div>
              <q-space />
            </template>
            <template v-slot:body-cell-unit_id="props">
              <q-td :props="props">
                <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.unit')" v-model="props.row.unit_id" :options="unit.units" v-if="!unit.loading" />
              </q-td>
            </template>
            <template v-slot:body-cell-quantity="props">
              <q-td :props="props">
                <forms-input :required="true" :rules="[rule.nonNegativeNumber]" v-model="props.row.sell_price" type="number" />
              </q-td>
            </template>
            <template #body-cell-actions="props" v-if="itemWizard.itemFormWizard.units.length > 1">
              <q-td :props="props">
                <q-btn dense round flat color="negative" icon="cancel" @click="itemWizard.removeUnit(props.row.id)">
                  <q-tooltip>{{ $getTranslation('shared.buttons.cancel') }}</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="col-12 col-sm-6 pl-2">
          <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.supplier')"
          v-model="itemWizard.itemFormWizard.supplier_id" :options="supplier.suppliers" @change="changeSupplier" v-if="!supplier.loading" />
          <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.code')"
          v-model="itemWizard.itemFormWizard.code" />
          <forms-input :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.code')"
          v-model="itemWizard.itemFormWizard.code" />
          {{ $getTranslation('shared.labels.barcodeDefaultSameAsCode') }}
          <forms-input class="mb-5" :label="$getTranslation('shared.columns.barcode')" v-model="itemWizard.itemFormWizard.barcode" />

          <VueBarcode class="mb-5" v-if="itemWizard.itemFormWizard.barcode || itemWizard.itemFormWizard.code" :value="itemWizard.itemFormWizard.barcode && itemWizard.itemFormWizard.barcode !== null ? itemWizard.itemFormWizard.barcode : itemWizard.itemFormWizard.code" tag="svg" />
        </div>
      </div>

      <hr class="ml-0 mb-4">
      <span class="text-bold ml-0">{{ $getTranslation('shared.columns.purchasePrice') }} <q-btn class="ml-3" @click="itemWizard.addBasePrice()" color="primary">{{ $getTranslation('shared.buttons.add') }}</q-btn></span>

      <q-card class="ml-0" bordered v-for="(basePrice, basePriceIndex) in itemWizard.itemFormWizard.base_prices">
        <q-card-section>
        <div class="row">
          <div class="col-12">
            <div class="inline-block mr-4">
              <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.purchasePrice')" type="number" v-model="basePrice.purchase_price" :autofocus="true" @keyup="itemWizard.calculateDefaultPrice(basePriceIndex)" style="width: 180px;" />
            </div>
            <div class="inline-block">
              <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.cost')" type="number" v-model="basePrice.cost" @keyup="itemWizard.calculateDefaultPrice(basePriceIndex)" style="width: 180px;" />
            </div>
            <div class="float-right">
              <q-btn v-if="itemWizard.itemFormWizard.base_prices.length > 1" dense round flat color="negative" icon="delete" @click="itemWizard.removeBasePrice(basePriceIndex)"></q-btn>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-12 col-sm-6 pr-2">
                <q-table bordered class="mx-0 inline-block" dense :rows="basePrice.sell_prices" :columns="tableColumn.itemSellPricesTable" row-key="name" :no-data-label="$getTranslation('shared.labels.noData')"
                :no-results-label="$getTranslation('shared.labels.noSearchResut')" :hide-pagination="true">
                  <template v-slot:top>
                    <div class="box-title-table">
                      <span class="title-table">{{ $getTranslation('shared.columns.sellPrice') }}</span>
                    </div>
                    <q-space />
                  </template>
                  <template v-slot:body-cell-profit="props">
                    <q-td :props="props">
                      <forms-input :required="true" :rules="[rule.nonNegativeNumber]" v-model="props.row.profit" type="number" @keyup="itemWizard.calculateSellPrice(basePriceIndex, props.rowIndex, 'profit')" />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-sell_price="props">
                    <q-td :props="props">
                      <forms-input :required="true" :rules="[rule.nonNegativeNumber]" v-model="props.row.sell_price" type="number" @keyup="itemWizard.calculateSellPrice(basePriceIndex, props.rowIndex, 'sell_price')" />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-default_price="props">
                    <q-td :props="props">
                      <forms-input :required="true" :rules="[rule.nonNegativeNumber, (val: number) => rule.min(val, props.row.default_price_temp)]" v-model="props.row.default_price" type="number" @keyup="itemWizard.calculateSellPrice(basePriceIndex, props.rowIndex)" />
                    </q-td>
                  </template>
                </q-table>
              </div>
              <div class="col-12 col-sm-6 pl-2">
                <q-table class="mx-0 inline-block" dense :rows="basePrice.stocks" :columns="tableColumn.itemStocksTableByBasePrice" row-key="name" :no-data-label="$getTranslation('shared.labels.noData')"
                :no-results-label="$getTranslation('shared.labels.noSearchResut')" bordered grid flat hide-header :hide-pagination="true">
                <template v-slot:top>
                  <div class="box-title-table">
                    <span class="title-table">{{ $getTranslation('shared.labels.list') }} {{ $getTranslation('shared.columns.stock') }} {{ $getTranslation('shared.columns.warehouse') }}</span>
                  </div>
                  <q-space />
                </template>
                <template v-slot:item="props">
                  <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                    <q-card bordered flat>
                      <q-list dense v-for="col in props.cols" :key="col.name">
                        <q-item v-if="col.label == $getTranslation('shared.columns.stock')">
                          <q-item-section side>
                            <q-item-label caption>{{ col.label }}</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label v-if="col.label != $getTranslation('shared.columns.stock')" class="mt-3">{{ col.value }}</q-item-label>
                            <forms-input v-else :required="true" :rules="[rule.nonNegativeNumber]" v-model="props.row.stock" type="number" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </div>
                </template>
                <template v-slot:body-cell-stock="props">
                  <q-td :props="props">
                  </q-td>
                </template>
              </q-table>
              </div>
            </div>
          </div>
        </div>
        </q-card-section>
      </q-card>
      <hr>
      <forms-action-button :loading="itemWizard.loading" />
    </q-form>
  </div>
</template>