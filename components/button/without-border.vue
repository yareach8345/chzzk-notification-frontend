<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()
</script>

<template>
  <button
      class="rounded-lg transition-colors duration-500 ease-in-out p-2"
      :class="{
        'hover:bg-selected': !disabled,
        'opacity-50': disabled
      }"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>