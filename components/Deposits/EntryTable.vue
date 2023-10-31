<script setup lang="ts">
const deposit = useDepositStore()
const tableColumn = useTableColumn()
const filter = ref('')
const rule = useRule()

const account = useAccountStore()

await account.getAll()
</script>
<template>
  <q-table bordered class="mx-0" dense :rows="deposit.depositForm?.entries" :columns="tableColumn.depositEntriesFormTable" row-key="name"
    :filter="filter" :no-data-label="$getTranslation('shared.labels.noData')"
    :no-results-label="$getTranslation('shared.labels.noSearchResut')">
    <template v-slot:top>
      <b>{{ $getTranslation('shared.labels.list') + ' ' + $getTranslation('shared.columns.entry') }}</b>
      <q-space />
      <q-btn color="primary" @click="deposit.addItem()" :label="$getTranslation('shared.buttons.add')" />
    </template>
    <template v-slot:body-cell-account_id="props">
      <q-td :props="props">
        <forms-select :required="true" :rules="[rule.required]" :label="$getTranslation('shared.columns.account')" v-model="props.row.account_id" :options="account.accounts" />
      </q-td>
    </template>
    <template v-slot:body-cell-description="props">
      <q-td :props="props">
        <forms-input :required="true" :rules="[rule.required]" type="textarea" class="d-block" :label="$getTranslation('shared.columns.description')" v-model="props.row.description" />
      </q-td>
    </template>
    <template v-slot:body-cell-amount="props">
      <q-td :props="props">
        <forms-input :required="true" :rules="[rule.required, rule.positiveNumber]" :label="$getTranslation('shared.columns.amount')" v-model="props.row.amount" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="negative" icon="delete" @click="deposit.removeItem(props.pageIndex)">
          <q-tooltip>{{ $getTranslation('shared.buttons.delete') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>
