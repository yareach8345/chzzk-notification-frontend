<script setup lang="ts">
import { getChannelImageUrl } from '~/util/ApiUtil'
import { getBorderColorStyle } from '~/util/ChannelUtil'

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
  }
}

const { channel } = defineProps<Props>()

const imgSrc = computed(() => getChannelImageUrl(channel.channelId))

const borderColorStyle = getBorderColorStyle(channel)

const channelImgAlt = computed(() => `${channel.detail.displayName} 채널의 이미지`)
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