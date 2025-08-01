<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()
</script>

<template>
  <button
      class="enabled:hover:underline enabled:hover:text-blue-500 disabled:opacity-50"
      :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>
