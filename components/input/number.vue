<script setup lang="ts">
import type { Input } from '~/types/components/Input'

interface Props {
  disabled?: boolean
  min?: number
  max?: number
}

const { disabled = false, min, max } = defineProps<Props>()

const value = defineModel({ required: true })

const inputRef = ref<HTMLInputElement | undefined>()

const showError = (message: string): void => {
  inputRef.value?.setCustomValidity(message)
  inputRef.value?.reportValidity()
}

defineExpose<Input>({
  showError
})
</script>

<template>
  <input
      ref="inputRef"
      type="text"
      class="border border-default bg-default invalid:text-error out-of-range:text-error text-lg p-1 rounded-md focus:border-white outline-none"
      :disabled="disabled"
      v-model="value"
      :min="min"
      :max="max"
  />
</template>

<style scoped>

</style>