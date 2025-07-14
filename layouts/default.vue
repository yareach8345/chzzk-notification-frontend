<script setup lang="ts">
const sidebarOpen = ref(false);

const isSidebarToggle = () => {
  sidebarOpen.value = !sidebarOpen.value;
}

const sidebarOpenButtonTitle = computed(() => `사이드바 ${sidebarOpen.value ? '닫기' : '열기'}`)

const openGithubFrontendRepository = () => {
  window.open('https://github.com/yareach8345/chzzk-notification-frontend', '_blank')
}

const openGithubBackendRepository = () => {
  window.open('https://github.com/yareach8345/chzzk-notification-backend', '_blank')
}
</script>

<template>
  <div class="bg-chzzk-black text-white min-h-svh flex flex-col p-2 sm:p-4">
    <header class="flex w-full sm:justify-center items-center">
      <div class="sm:absolute sm:left-0">
        <button-neon
            class="flex border-none"
            @click="isSidebarToggle"
            :title="sidebarOpenButtonTitle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg>
        </button-neon>
      </div>
      <div class="flex justify-center items-center max-sm:flex-1">
        <img src="/image/chzzk_icon.png" alt="치지직 로고" class="h-14"/>
        <h1 class="font-blackHan leading-none relative top-[2px] text-center text-4xl text-chzzk-neon-green">
          Chzzk Notification
        </h1>
      </div>
    </header>
    <main class="relative flex-1 flex flex-col justify-center items-center">
      <sidebar
          class="absolute top-0 -left-4 transition-transform duration-300 ease-in-out"
          :class="{
            '-translate-x-full': !sidebarOpen,
            'translate-x-0': sidebarOpen
          }"
      />
      <slot></slot>
    </main>
    <footer class="flex justify-center items-center flex-col">
      <div> made by - yareach </div>
      <div class="flex justify-center">
        <button-neon
            class="flex m-4"
            @click="openGithubBackendRepository"
            title="깃헙 백엔드 레포지토리로 이동"
        >
          <svg-github/>
          <span>Backend Repository</span>
        </button-neon>
        <button-neon
            class="flex m-4"
            @click="openGithubFrontendRepository"
            title="깃헙 프론트 레포지토리로 이동"
        >
          <svg-github/>
          <span>Frontend Repository</span>
        </button-neon>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>