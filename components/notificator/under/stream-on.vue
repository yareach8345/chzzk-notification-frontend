<script setup lang="ts">
import type { ChannelId } from '~/types/Channel'
import type { MinimalChannelDetail } from '~/dto/channel/MinimalChannelInfoDto'
import { openChannelLivePage } from '~/api/ChannelRequest'

interface Props {
  channels: {
    channelId: ChannelId
    detail: Pick<MinimalChannelDetail, 'displayName'>
  }[]
}

const { channels } = defineProps<Props>()

const onLinkClick = (channelId: ChannelId) => {
  openChannelLivePage(channelId)
}
</script>

<template>
  <notificator-under-base class="border-live-on-notification bg-live-on-notification">
    <template #title>
      방송 ON!
    </template>
    <div class="flex gap-1">
      <p
          class="underline hover:text-blue-600"
          v-for="channel in channels"
          @click="onLinkClick(channel.channelId)"
      >
        {{channel.detail.displayName}}
      </p>
      <p>
        채널 스트리밍 ON
      </p>
    </div>
  </notificator-under-base>
</template>

<style scoped>

</style>