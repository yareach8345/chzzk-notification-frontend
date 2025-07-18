<script setup lang="ts">
interface Props {
  disabled?: boolean
  min?: number
  max?: number
}

const { disabled = false, min, max } = defineProps<Props>()

const value = defineModel({ required: true })
</script>

<template>
  <input
      type="text"
      class="border border-chzzk-border bg-chzzk-black text-lg p-1 rounded-md focus:border-white outline-none"
      :disabled="disabled"
      v-model="value"
      :min="min"
      :max="max"
  />
</template>

<style scoped>

</style>