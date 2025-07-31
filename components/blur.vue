<script setup lang="ts">
const isSecretKeyBlur = ref(true)

const blurClass = computed(() => ({ 'blur-sm': isSecretKeyBlur.value }))

const deactivateBlur = () => {
  isSecretKeyBlur.value = false
}
</script>

<template>
  <p
      class="text-sm"
      :class="blurClass"
      @click.stop="deactivateBlur"
  >
    <slot/>
  </p>
</template>

<style scoped>

</style>