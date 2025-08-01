<script setup lang="ts">
interface Props {
  disabled?: boolean
  submit?: boolean
}

const { disabled = false, submit = false } = defineProps<Props>()

const buttonType = computed(() => submit ? 'submit' : 'button')
</script>

<template>
  <button
      class="border-4 border-default rounded-lg transition-colors duration-500 ease-in-out p-2 disabled:opacity-50 enabled:hover:bg-selected enabled:hover:border-selected"
      :type="buttonType"
      :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>