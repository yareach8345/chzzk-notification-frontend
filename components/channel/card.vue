<script setup lang="ts">
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'

interface Props {
  channel: MinimalChannelInfoDto
}

const { channel } = defineProps<Props>()

const cardBorderClass = computed(() => ({
  'border-chzzk-stream-on': channel.liveState.isOpen,
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
    <channel-profile
        class="w-16"
        :channel="channel"
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
    <channel-state class="flex-shrink-0" :channel="channel"/>
  </article>
</template>

<style scoped>
</style>