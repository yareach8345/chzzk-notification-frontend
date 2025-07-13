<script setup lang="ts">
import { useAuthInfoStore } from '~/store/AuthInfoStore'
import { logout } from '~/api/AuthRequests'

const isAuthenticated = storeToRefs(useAuthInfoStore()).isAuthenticated

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
      <div class="flex justify-center items-center max-sm:flex-1">
        <img src="/image/chzzk_icon.png" alt="치지직 로고" class="h-14"/>
        <h1 class="font-blackHan leading-none relative top-[2px] text-center text-4xl text-chzzk-neon-green">
          Chzzk Notification
        </h1>
      </div>
      <div class="sm:absolute sm:right-0">
        <neon-button
            v-if="isAuthenticated"
            class="flex border-none"
            @click="logout"
        >
          <svg-logout/>
        </neon-button>
      </div>
    </header>
    <main class="flex-1 flex flex-col justify-center items-center">
      <slot></slot>
    </main>
    <footer class="flex justify-center items-center flex-col">
      <div> made by - yareach </div>
      <div class="flex justify-center">
        <neon-button
            class="flex m-4"
            @click="openGithubBackendRepository"
        >
          <svg-github/>
          <span>Backend Repository</span>
        </neon-button>
        <neon-button
            class="flex m-4"
            @click="openGithubFrontendRepository"
        >
          <svg-github/>
          <span>Frontend Repository</span>
        </neon-button>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>