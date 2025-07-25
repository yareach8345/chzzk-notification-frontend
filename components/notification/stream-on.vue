<script setup lang="ts">
import type { ChannelId } from '~/types/Channel'
import type { LiveOpenDto, MinimalChannelDetail } from '~/dto/channel/MinimalChannelInfoDto'
import { openChannelLivePage } from '~/api/ChannelRequest'
import { getPlatformImageInfo } from '~/util/ApiUtil'

interface Props {
  channel: {
    channelId: ChannelId
    detail: Pick<MinimalChannelDetail, 'displayName'>
    liveState: Pick<LiveOpenDto, 'liveTitle'>
  }
}

const { channel } = defineProps<Props>()

const platformIcon = getPlatformImageInfo(channel.channelId.platform)

const onLinkClick = () => {
  openChannelLivePage(channel.channelId)
}
</script>

<template>
  <notification-base class="border-live-on-notification bg-live-on-notification">
    <template #title>
      방송 ON!
    </template>
    [{{channel.detail.displayName}}] 채널 스트리밍 ON!
    <template #detail>
      <p class="text-xs truncate">
        {{channel.liveState.liveTitle}}
      </p>
      <button-link class="flex items-center gap-1 text-xs" @click="onLinkClick">
        <img class="h-3" :src="platformIcon?.src" :alt="platformIcon?.alt" />
        라이브 보러가기
      </button-link>
    </template>
  </notification-base>
</template>

<style scoped>

</style>