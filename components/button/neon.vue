<script setup lang="ts">
interface Props {
  disabled?: boolean
  submit?: boolean
}

const { disabled = false, submit = false } = defineProps<Props>()

const classes = computed(() => ({
  'hover:border-white': !disabled,
  'hover:bg-selected': !disabled,
  'opacity-50': disabled
}))

const buttonType = computed(() => submit ? 'submit' : 'button')
</script>

<template>
  <button
      :type="buttonType"
      :class="classes"
      class="border-4 border-default rounded-lg transition-colors duration-500 ease-in-out p-2"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>