<script setup lang="ts">
import { useAuthInfoStore } from '~/store/AuthInfoStore'
import { logout, openLoginPage } from '@/api/AuthRequests'

const { authInfo, isAuthenticated } = storeToRefs(useAuthInfoStore())

const userIcon = computed(() => authInfo.value?.picture ?? '/image/default-user-icon.jpg')
</script>

<template>
  <div>
    <div class="text-center text-xs">로그인 정보</div>
    <div class="flex gap-1 items-center">
      <img
          class="h-12 rounded-full"
          :src="userIcon"
          alt="유저 아이콘"
      />
      <template v-if="isAuthenticated">
        <div>
          <div class="font-bold">{{authInfo?.displayName}}</div>
          <div class="font-thin">{{authInfo?.email}}</div>
        </div>
        <neon-button
            class="border-none"
            @click="logout"
        >
          <svg-logout/>
        </neon-button>
      </template>
      <template v-else>
        <div>로그인이 필요합니다.</div>
        <neon-button
            class="border-none"
            @click="openLoginPage"
        >
          <svg-login/>
        </neon-button>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>