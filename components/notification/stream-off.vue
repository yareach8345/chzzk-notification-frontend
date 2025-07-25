<script setup lang="ts">
import type { ChannelId } from '~/types/Channel'
import type { MinimalChannelDetail } from '~/dto/channel/MinimalChannelInfoDto'

interface Props {
  channel: {
    channelId: ChannelId
    detail: Pick<MinimalChannelDetail, 'displayName'>
  }
}

const { channel } = defineProps<Props>()
</script>

<template>
  <notification-base class="border-live-off-notification bg-live-off-notification">
    <template #title>
      방송 OFF!
    </template>
    [{{channel.detail.displayName}}] 채널 스트리밍 OFF
  </notification-base>
</template>

<style scoped>

</style>