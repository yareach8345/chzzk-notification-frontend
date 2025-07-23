<script setup lang="ts">
const theme = ref<string>('default')
const onThemeSelected = () => {
  if(theme.value === 'default') {
    document.documentElement.removeAttribute('data-theme')
  }
  document.documentElement.setAttribute('data-theme', theme.value)
}
</script>

<template>
  <div class="flex-grow flex flex-col justify-end">
    <div class="flex justify-center items-center gap-2">
      <div>
        태마 :
      </div>
      <select
          class="bg-default border border-default rounded-md"
          @change="onThemeSelected"
          v-model="theme"
      >
        <option value="default">기본 태마</option>
        <option value="chzzk">chzzk</option>
        <option value="chzzk">youtube</option>
      </select>
    </div>
  </div>
</template>

<style scoped>

</style>