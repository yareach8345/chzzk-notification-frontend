<script setup lang="ts">
import type { ChannelId } from '~/types/Channel'
import type { MinimalChannelDetail } from '~/dto/channel/MinimalChannelInfoDto'

interface Props {
  channels: {
    channelId: ChannelId
    detail: Pick<MinimalChannelDetail, 'displayName'>
  }[]
}

const { channels } = defineProps<Props>()
</script>

<template>
  <notificator-under-base class="border-live-off-notification bg-live-off-notification">
    <template #title>
      방송 OFF!
    </template>
    <div class="flex gap-1">
      <p
          v-for="channel in channels"
      >
        {{channel.detail.displayName}}
      </p>
      <p>
        채널 스트리밍 OFF
      </p>
    </div>
  </notificator-under-base>
</template>

<style scoped>

</style>