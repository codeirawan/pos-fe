<script setup lang="ts">

export interface IActionButton {
  disabled?: boolean
  hasResetButton?: boolean
  hasSubmitButton?: boolean
  loading: boolean
}

withDefaults(defineProps<IActionButton>(), {
  disabled: false,
  hasResetButton: true,
  hasSubmitButton: true,
  loading: false
})

</script>

<template>
  <div class="float-right">
    <q-btn v-if="hasSubmitButton" :label="$getTranslation('shared.buttons.submit')" type="submit" color="positive" :disabled="disabled" :loading="loading" />
    <q-btn v-if="hasResetButton" :label="$getTranslation('shared.buttons.reset')" type="reset" color="secondary" flat class="q-ml-sm" :disabled="disabled" :loading="loading" />
  </div>
</template>