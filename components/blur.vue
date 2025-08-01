<script setup lang="ts">
const isSecretKeyBlur = ref(true)

const blurClass = computed(() => ({ 'blur-sm': isSecretKeyBlur.value }))

const deactivateBlur = () => {
  isSecretKeyBlur.value = false
}
</script>

<template>
  <p
      class="transition-all duration-200"
      :class="blurClass"
      @click.stop="deactivateBlur"
  >
    <slot/>
  </p>
</template>

<style scoped>

</style>