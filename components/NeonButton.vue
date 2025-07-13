<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const { disabled } = withDefaults(defineProps<Props>(), {
  disabled: false
})
</script>

<template>
  <button
      class="border-4 border-chzzk-border rounded-lg transition-colors duration-500 ease-in-out p-2"
      :class="{
        'hover:border-white': !disabled,
        'hover:bg-selected': !disabled,
        'opacity-50': disabled
      }"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>