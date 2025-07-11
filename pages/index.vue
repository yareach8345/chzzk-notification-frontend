<script setup lang="ts">
import { useUserStore } from '@/store/UserStore'

definePageMeta({
  middleware: ['require-auth']
})

const userStore = useUserStore()
const user1 = await userStore.getUser()
</script>

<template>
  만약 이 글이 보인다면 로그인이 된 것이다.<br>
  로그인 된 유저 : {{ user1?.displayName ?? "no" }}
</template>

<style scoped>

</style>