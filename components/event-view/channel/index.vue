<script setup lang="ts">
import type { ChannelEvents } from '~/types/Events'
import { channelIdToString } from '~/util/ChannelUtil'
import { dateToString } from '~/util/dateUtil'

interface Props {
  event: ChannelEvents
}

const { event } = defineProps<Props>()

const isDetailOpen = ref(false)

const detailShowable = event.type === 'info-change' || event.type === 'state-change'

const playSvgClass = computed(() => ({
  'rotate-90' : isDetailOpen.value,
  'text-stream-off': !detailShowable,
}))

const detailClicked = () => {
  if(!detailShowable) {
    return
  }

  isDetailOpen.value = !isDetailOpen.value
}

const openChannelPage = () => {
  navigateTo({
    name: 'channels-platform-channelId',
    params: {
      'platform': event.channelId.platform,
      'channelId': event.channelId.id
    }
  })
}
</script>

<template>
  <div class="border border-default rounded-lg p-2 transition-all duration-300 ease-in-out">
    <div
        class="flex items-center gap-3"
        @click="detailClicked"
    >
      <div>
        <svg-filled-play
            class="transition-all duration-300 ease-in-out"
            :class="playSvgClass"
        />
      </div>
      <div class="flex-grow">
        <h4 class="text-lg">{{event.type}}</h4>
        <button-link
            class="text-sm text-stream-off"
            @click.stop="openChannelPage"
        >
          <p class="max-sm:hidden">{{channelIdToString(event.channelId)}}</p>
          <p class="sm:hidden">채널 페이지 열기</p>
        </button-link>
      </div>
      <client-only>
        <div class="text-sm">
          {{dateToString(event.timeOfEvent)}}
        </div>
      </client-only>
    </div>
    <div
        v-show="isDetailOpen"
    >
      <event-view-channel-detail-info-change
          v-if="event.type === 'info-change'"
          :event="event"
      />
      <event-view-channel-detail-state
          v-else-if="event.type === 'state-change'"
          :event="event"
      />
    </div>
  </div>
</template>

<style scoped>

</style>