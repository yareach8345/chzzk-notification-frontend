<script setup lang="ts">
const show = defineModel<boolean>()

watch(show, () => {
  console.log('show', show.value)
})
</script>

<template>
  <div
      v-show="show"
      class="transition-all duration-300 ease-in-out overflow-hidden"
  >
    <slot/>
  </div>
</template>