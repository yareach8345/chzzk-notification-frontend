<script setup lang="ts">
import { useChannelStore } from '~/store/ChannelStore'

definePageMeta({
  middleware: ['require-auth']
})

useHead({
  title: '채널'
})

const channelStore = useChannelStore()
const channels = await channelStore.getChannels()
console.log(channels)
</script>

<template>
  <h2 class="text-2xl">
    채널 페이지
  </h2>
</template>

<style scoped>

</style>