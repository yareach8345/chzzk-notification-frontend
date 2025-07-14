<script setup lang="ts">
import NeonBox from '~/components/NeonBox.vue'
import { useAuthInfoStore } from '~/store/AuthInfoStore'
import { navigateToHome } from '~/util/RoutingUtil'

definePageMeta({
  middleware: ['not-valid-user-page-guard'],
})

useHead({
  title: '허가되지 않은 계정'
})

const authInfoStore = useAuthInfoStore()

const logout = async () => {
  await authInfoStore.logout()
  await navigateToHome()
}
</script>

<template>
  <neon-box class="flex flex-col items-center">
    <h2 class="text-xl">
      허가되지 않은 이메일입니다.
    </h2>
    <div class="border-2 border-chzzk-border rounded-lg p-4 mt-4">
      본 사이트는 개인적인 목적으로 만들어졌습니다.<br>
      개발자 개인이 지정한 이메일이 아니면 로그인 되지 않습니다.
    </div>
    <button-neon
        class="mt-4 flex"
        @click="logout"
    >
      <svg-logout/>
      <div>
        로그아웃 하기
      </div>
    </button-neon>
  </neon-box>
</template>

<style scoped>

</style>