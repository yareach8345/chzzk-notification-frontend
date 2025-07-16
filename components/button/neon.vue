<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()

const classes = computed(() => ({
  'hover:border-white': !disabled,
  'hover:bg-selected': !disabled,
  'opacity-50': disabled
}))
</script>

<template>
  <button
      :class="classes"
      class="border-4 border-chzzk-border rounded-lg transition-colors duration-500 ease-in-out p-2"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>