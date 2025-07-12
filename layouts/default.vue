<script setup lang="ts">

</script>

<template>
  <div class="bg-chzzk-black text-white p-4 min-h-svh">
    <header class="flex justify-center items-center w-full">
      <img src="/image/chzzk_icon.png" alt="치지직 로고" class="h-14"/>
      <div class="font-blackHan leading-none relative top-[2px] text-center text-4xl text-chzzk-neon-green">
        Chzzk Notification
      </div>
    </header>
    <main>
      <slot/>
    </main>
  </div>
</template>

<style scoped>

</style>