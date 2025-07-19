<script setup lang="ts">
import { getChannelImageUrl } from '~/util/ApiUtil'
import { getBorderColorStyle } from '~/util/ChannelUtil'
import { defaultChannelImage, liveOffColor } from '~/constants/ChannelInfo'

interface Props {
  channel: {
    channelId: string,
    detail: {
      displayName: string,
      color?: string
    },
    liveState: {
      isOpen: boolean
    }
  } | null,
}

const { channel } = defineProps<Props>()

const imgSrc = computed(() => {
  if(channel == null) {
    return defaultChannelImage
  }
  return getChannelImageUrl(channel.channelId)
})

const borderColorStyle = { borderColor: channel !== null ? getBorderColorStyle(channel) : liveOffColor }

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