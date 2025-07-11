<script setup lang="ts">
import { useUserStore } from '@/store/UserStore'

definePageMeta({
  middleware: ['require-auth']
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  만약 이 글이 보인다면 로그인이 된 것이다.<br>
  로그인 된 유저 : {{ user?.displayName }}
</template>

<style scoped>

</style>