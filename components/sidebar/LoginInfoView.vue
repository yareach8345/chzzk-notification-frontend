<script setup lang="ts">
import { useAuthInfoStore } from '~/store/AuthInfoStore'
import { openLoginPage } from '@/api/AuthRequests'
import { navigateToHome } from '~/util/RoutingUtil'

const authInfoStore = useAuthInfoStore()
const { authInfo, isAuthenticated } = storeToRefs(authInfoStore)

const userIcon = computed(() => authInfo.value?.picture ?? '/image/default-user-icon.jpg')

const logout = async () => {
  await authInfoStore.logout()
  await navigateToHome()
}
</script>

<template>
  <div>
    <div class="opacity-70 text-xs mb-1">로그인 정보</div>
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
        <button-neon
            class="border-none"
            @click="logout"
            title="로그아웃"
        >
          <svg-logout/>
        </button-neon>
      </template>
      <template v-else>
        <div>로그인이 필요합니다.</div>
        <button-neon
            class="border-none"
            @click="openLoginPage"
            title="로그인"
        >
          <svg-login/>
        </button-neon>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>