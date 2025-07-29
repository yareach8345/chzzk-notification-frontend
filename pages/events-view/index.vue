<script setup lang="ts">
import { useEventStore } from '~/store/EventStore'
import { dateToString } from '~/util/dateUtil'
import { channelIdToString } from '~/util/ChannelUtil'

definePageMeta({
  middleware: ['require-auth']
})

useHead({
  title: '실시간 이벤트'
})

const { channelEvents, observationStartTime, lastUpdateTime } = storeToRefs(useEventStore())

//테스트용. 컴포넌트로 추출할 것
const testOpen = ref(false)
const detailClicked = () => {
  console.log('wow')
  testOpen.value = !testOpen.value
}
</script>

<template>
  <box class="container flex flex-col items-center">
    <h2 class="text-2xl">
      실시간 이벤트 뷰어
    </h2>
    <client-only>
      <div>
        관측 시작 시간 : <span>{{dateToString(observationStartTime)}}</span>
      </div>
      <div>
        마지막 업데이트 시간 : <span>{{dateToString(lastUpdateTime)}}</span>
      </div>
    </client-only>
    <div
        class="border border-default rounded-lg p-2 transition-all duration-300 ease-in-out"
        v-for="event in channelEvents"
    >
      <div
          class="flex items-center gap-3"
          @mousedown.left="detailClicked"
      >
        <div>
          <svg-filled-play
              class="transition-all duration-300 ease-in-out"
              :class="{'rotate-90' : testOpen}"
          />
        </div>
        <div class="flex-grow">
          <h4 class="text-lg">{{event.type}}</h4>
          <p class="text-sm text-stream-off">{{channelIdToString(event.channelId)}}</p>
        </div>
        <client-only>
          <div class="text-sm">
            {{dateToString(event.timeOfEvent)}}
          </div>
        </client-only>
      </div>
      <div
          v-show="testOpen"
      >
        <div
            v-if="event.type === 'info-change'"
            v-for="entry in Object.entries(event.changedInfos)"
        >
          <p>{{entry[0]}}</p>
          <p>{{entry[1]}}</p>
        </div>
      </div>
    </div>
  </box>
</template>

<style scoped>

</style>