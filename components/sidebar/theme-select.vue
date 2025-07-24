<script setup lang="ts">
import { getTheme } from '~/composables/theme'

const theme = getTheme()
</script>

<template>
  <div class="flex-grow flex flex-col justify-end">
    <div class="flex justify-center items-center gap-2">
      <div>
        태마 :
      </div>
      <select
          class="bg-default border border-default rounded-md"
          v-model="theme"
      >
        <option value="default">light</option>
        <option value="black">black</option>
      </select>
    </div>
  </div>
</template>

<style scoped>

</style>