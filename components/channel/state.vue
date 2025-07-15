<script setup lang="ts">
import type { LiveCloseDto, LiveOpenDto } from '~/dto/channel/MinimalChannelInfoDto'

interface Props {
  channel: {
    liveState: Pick<LiveCloseDto, 'isOpen'> | Pick<LiveOpenDto, 'isOpen' | 'concurrentUserCount'>
  }
}

const { channel } = defineProps<Props>()

const streamColor = computed(() => channel.liveState.isOpen ? 'text-red-400' : 'text-chzzk-stream-off')

const currentUserMessage = computed(() =>
    channel.liveState.isOpen
        ? `시청자 : ${channel.liveState.concurrentUserCount}`
        : 'stream off..'
)
</script>

<template>
  <div>
    <p class="flex" :class="streamColor">
      <svg-stream/>
      <span>stream {{channel.liveState.isOpen ? "on!" : "off"}}</span>
    </p>
    <p class="font-light">{{currentUserMessage}}</p>
  </div>
</template>

<style scoped>

</style>