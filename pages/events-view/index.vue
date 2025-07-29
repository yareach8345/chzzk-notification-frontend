<script setup lang="ts">
import { useEventStore } from '~/store/EventStore'
import { dateToString } from '~/util/dateUtil'

definePageMeta({
  middleware: ['require-auth']
})

useHead({
  title: '실시간 이벤트'
})

const eventStore = useEventStore()
const { channelEvents, observationStartTime, lastUpdateTime } = storeToRefs(eventStore)

const showEventCount = ref(10)

const startIndex = computed(() => Math.max(channelEvents.value.length - showEventCount.value, 0))

const showEvents = computed(() => channelEvents.value.slice(startIndex.value))

const changeShowEventCount = (delta: number) => {
  const origin = showEventCount.value

  if(origin + delta <= 0) {
    return
  }

  showEventCount.value = origin + delta
}
</script>

<template>
  <box class="container relative flex flex-col items-center gap-2 sm:min-h-52">
    <h2 class="text-2xl">
      실시간 이벤트 뷰어
    </h2>
    <div class="flex flex-col">
      <client-only>
        <div>
          관측 시작 시간 : <span>{{dateToString(observationStartTime)}}</span>
        </div>
        <div>
          마지막 업데이트 시간 : <span>{{dateToString(lastUpdateTime)}}</span>
        </div>
      </client-only>
    </div>
    <div class="sm:absolute sm:right-3 sm:top-3 flex sm:flex-col sm:items-end gap-10 sm:gap-2">
      <!-- 컨트롤러 -->
      <div class="flex sm:flex-col-reverse items-center gap-1">
        <button-without-border
            @click="changeShowEventCount(-1)"
        >
          <svg-filled-play class="rotate-180 sm:rotate-90"/>
        </button-without-border>
        <input-number
            class="w-8"
            :min="1"
            v-model="showEventCount"
        />
        <button-without-border
            @click="changeShowEventCount(1)"
        >
          <svg-filled-play class="sm:-rotate-90"/>
        </button-without-border>
      </div>
      <div>
        <button-without-border
            @click="eventStore.resetEvents"
            title="이벤트 초기화"
        >
          <svg-back/>
        </button-without-border>
      </div>
    </div>
    <div class="grid grid-cols-[auto_auto] gap-x-4 gap-y-2 items-center">
      <template v-for="(event, index) in showEvents">
        <p class="text-lg">{{index + startIndex + 1}}</p>
        <event-view :event="event"/>
      </template>
    </div>
  </box>
</template>

<style scoped>

</style>