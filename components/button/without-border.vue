<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()
</script>

<template>
  <button class="rounded-lg transition-colors duration-500 ease-in-out p-2 disabled:opacity-50 enabled:hover:bg-selected">
    <slot/>
  </button>
</template>

<style scoped>

</style>