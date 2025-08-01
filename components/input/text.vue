<script setup lang="ts">
import type { Input } from '~/types/components/Input'

interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()

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
      class="border border-default invalid:border-error bg-default text-lg p-1 rounded-md focus:border-selected outline-none"
      :disabled="disabled"
      v-model="value"
  />
</template>

<style scoped>

</style>