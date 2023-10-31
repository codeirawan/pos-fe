<script setup lang="ts">
const module = 'stores'
import IStoreForm from '~/interfaces/Stores/IStoreForm'

export interface IStoredata {
  data: IStoreForm,
}

withDefaults(defineProps<IStoredata>(), {
  data: {} as IStoreForm,
})
</script>

<template>
  <forms-breadcumb :module="module" :title="$getTranslation(`modules.${$toCamelCase(module)}.title`)" page="Detail" />
  <div>
    <forms-label :label="$getTranslation('shared.columns.name')" :value="data.name" />
    <forms-label :label="$getTranslation('shared.labels.tax')" :value="`${data.tax_percentage} %`" />
    <forms-label :label="$getTranslation('shared.columns.saleLowerPricePermission')" :value="$formatBoolean(data.sale_lower_price_permission)" />
    <forms-label :label="$getTranslation('shared.columns.whatsappNumber')" :value="data.whatsapp_number" />
    <forms-label :label="$getTranslation('shared.columns.isWhatsappGroup')" :value="$formatBoolean(data.is_whatsapp_group)" />
    <forms-label :label="$getTranslation('shared.columns.address')"
      :value="data.address" />
  </div>
</template>
