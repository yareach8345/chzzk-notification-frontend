<script setup lang="ts">
import { useAuthInfoStore } from '~/store/AuthInfoStore'

definePageMeta({
  middleware: ['require-auth']
})

useHead({
  title: '메인 페이지'
})
const { authInfo } = useAuthInfoStore()
</script>

<template>
  만약 이 글이 보인다면 로그인이 된 것이다.<br>
  로그인 된 유저 : {{ authInfo?.displayName ?? "no" }}
</template>

<style scoped>

</style>