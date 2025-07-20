<script setup lang="ts">
import { getChannelImageUrl } from '~/util/ApiUtil'
import { getBorderColorStyle } from '~/util/ChannelUtil'
import { defaultChannelImage, liveOffColor } from '~/constants/ChannelInfo'
import type { ChannelId } from '~/types/ChannelId'
import type { ChannelDetailDto, LiveStateDto } from '~/dto/channel/ChannelInfoDto'

interface Props {
  channel: {
    channelId: ChannelId
    detail: Pick<ChannelDetailDto, 'displayName' | 'color'>
    liveState: Pick<LiveStateDto, 'isOpen'>
  } | undefined,
  channelImageUrl?: string
}

const { channel, channelImageUrl } = defineProps<Props>()

const imgSrc = computed(() => {
  if(!!channelImageUrl) {
    return channelImageUrl
  }
  if(!!channel) {
    return getChannelImageUrl(channel.channelId)
  }
  return defaultChannelImage
})

const borderColorStyle = { borderColor: channel !== undefined ? getBorderColorStyle(channel) : liveOffColor }

const channelImgAlt = computed(() => `${channel?.detail.displayName ?? ""} 채널 이미지`.trim())
</script>

<template>
  <img
      class="rounded-full border-2 p-1"
      :style="borderColorStyle"
      :src="imgSrc"
      :alt="channelImgAlt"
  />
</template>

<style scoped>

</style>