<script setup lang="ts">
import type {
  LiveCloseDto,
  LiveOpenDto,
  MinimalChannelDetail,
} from '~/dto/channel/MinimalChannelInfoDto'
import type { ChannelId } from '~/types/ChannelId'

type ChannelDto = {
  channelId: ChannelId
  liveState: Pick<LiveOpenDto, 'isOpen' | 'category' | 'concurrentUserCount'> | Pick<LiveCloseDto, 'isOpen'>
  detail: Pick<MinimalChannelDetail, 'displayName' | 'color'>
}

interface Props {
  channel: ChannelDto
  channelImageUrl?: string
}

const { channel, channelImageUrl } = defineProps<Props>()

const cardBorderClass = computed(() => ({
  'border-chzzk-stream-on': channel.liveState.isOpen,
  'border-chzzk-stream-off': !channel.liveState.isOpen,
}))
</script>

<template>
  <article
      class="border-2 rounded-md p-2 flex items-center gap-2"
      :class="cardBorderClass"
  >
    <channel-profile
        class="w-16"
        :channel="channel"
        :channelImageUrl="channelImageUrl"
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