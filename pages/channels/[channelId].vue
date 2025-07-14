<script setup lang="ts">
import { getChannel } from '~/api/ChannelRequest'
import { processAsyncData } from '~/util/ApiUtil'

definePageMeta({
  middleware: ['require-auth', 'require-channel-info']
})

const route = useRoute()
const channelId = Array.isArray(route.params.channelId) ? route.params.channelId[0] : route.params.channelId

const channel = await processAsyncData(getChannel(channelId))

useHead({
  title: `${channel.detail.displayName} 채널 상세정보`
})
</script>

<template>
  <section>
    <box-gray>
      <channel-profile :channel="channel"/>
      {{channelId}}
    </box-gray>
  </section>
</template>

<style scoped>

</style>