<script setup lang="ts">
definePageMeta({
  middleware: ['require-auth']
})

useHead({
  title: '장치'
})
</script>

<template>
  <h2 class="text-2xl">
    디바이스 정보 페이지
  </h2>
</template>

<style scoped>

</style>