<script setup lang="ts">
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'
import { getChannelImageUrl } from '~/util/ApiUtil'

interface Props {
  channel: MinimalChannelInfoDto
}

const { channel } = defineProps<Props>()

const imgSrc = computed(() => getChannelImageUrl(channel.channelId))

const channelImgAlt = computed(() => `${channel.detail.displayName} 채널의 이미지`)

const cardBorderClass = computed(() => ({
  'border-chzzk-stream-on': channel.liveState.isOpen,
  'border-chzzk-stream-off': !channel.liveState.isOpen,
}))

const imgBorderClass = computed(() => ({
  'border-chzzk-neon-green': channel.liveState.isOpen,
  'border-chzzk-stream-off': !channel.liveState.isOpen,
}))

const streamColor = computed(() => channel.liveState.isOpen ? 'text-red-400' : 'text-chzzk-stream-off')

const currentUserMessage = computed(() =>
    channel.liveState.isOpen
    ? `시청자 : ${channel.liveState.concurrentUserCount}`
    : 'stream off..'
)
</script>

<template>
  <article
      class="border-2 rounded-md p-2 flex items-center gap-2"
      :class="cardBorderClass"
  >
    <img
        class="rounded-full w-16 border p-1"
        :class="imgBorderClass"
        :src="imgSrc"
        :alt="channelImgAlt"
    />
    <div class="flex-1 w-40 lg:min-w-52 truncate">
      <p class="text-xl">{{channel.detail.displayName}}</p>
      <p
          class="text-md font-light max-md:overflow-hidden"
          :title="channel.liveState.category"
          v-if="channel.liveState.isOpen"
      >
        {{channel.liveState.category}}
      </p>
    </div>
    <div>
      <p class="flex" :class="streamColor">
        <svg-stream/>
        <span>stream {{channel.liveState.isOpen ? "on!" : "off"}}</span>
      </p>
      <p class="font-light">{{currentUserMessage}}</p>
    </div>
  </article>
</template>

<style scoped>
</style>