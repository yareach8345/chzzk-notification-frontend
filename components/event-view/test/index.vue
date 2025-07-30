<script setup lang="ts">
import { dateToString } from '~/util/dateUtil'
import type { TestEvent } from '~/types/Events'

interface Props {
  event: TestEvent
}

const { event } = defineProps<Props>()

const isDetailOpen = ref(false)

const playSvgClass = computed(() => ({
  'rotate-90' : isDetailOpen.value,
}))

const detailClicked = () => {
  isDetailOpen.value = !isDetailOpen.value
}
</script>

<template>
  <div class="border border-test rounded-lg p-2 transition-all duration-300 ease-in-out">
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
        <h4 class="text-lg text-test">TEST MESSAGE</h4>
        <p class="text-sm text-stream-off">
          {{event.type}}<span v-if="event.testId !== undefined">-{{event.testId}}</span>
        </p>
      </div>
      <client-only>
        <div class="text-sm">
          {{dateToString(event.timeOfEvent)}}
        </div>
      </client-only>
    </div>
    <div v-show="isDetailOpen">
      {{event.content}}
    </div>
  </div>
</template>

<style scoped>

</style>