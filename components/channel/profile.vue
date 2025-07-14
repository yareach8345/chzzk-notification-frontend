<script setup lang="ts">
import { getChannelImageUrl } from '~/util/ApiUtil'

interface Props {
  channel: {
    channelId: string,
    detail: {
      displayName: string
    },
    liveState: {
      isOpen: boolean
    }
  }
}

const { channel } = defineProps<Props>()

const imgSrc = computed(() => getChannelImageUrl(channel.channelId))

const channelImgAlt = computed(() => `${channel.detail.displayName} 채널의 이미지`)

const imgBorderClass = computed(() => ({
  'border-chzzk-neon-green': channel.liveState.isOpen,
  'border-chzzk-stream-off': !channel.liveState.isOpen,
}))
</script>

<template>
  <img
      class="rounded-full border p-1"
      :class="imgBorderClass"
      :src="imgSrc"
      :alt="channelImgAlt"
  />
</template>

<style scoped>

</style>