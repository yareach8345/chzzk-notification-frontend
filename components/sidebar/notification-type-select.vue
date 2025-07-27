<script setup lang="ts">
const notificationType = getNotificationType()
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <div>
      알림위치 :
    </div>
    <select
        class="bg-default border border-default rounded-md"
        v-model="notificationType"
    >
      <option value="under">under</option>
      <option value="right-top">right-top</option>
    </select>
  </div>
</template>

<style scoped>

</style>