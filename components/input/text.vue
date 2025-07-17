<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()

const value = defineModel({ required: true })
</script>

<template>
  <input
      type="text"
      class="border border-chzzk-border bg-chzzk-black text-lg p-1 rounded-md focus:border-white outline-none"
      :disabled="disabled"
      v-model="value"
  />
</template>

<style scoped>

</style>