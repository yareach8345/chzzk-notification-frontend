<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled = false } = defineProps<Props>()
</script>

<template>
  <button
      class="p-2"
      :class="{
        'hover:underline': !disabled,
        'hover:text-blue-600': !disabled,
        'opacity-50': disabled
      }"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>
