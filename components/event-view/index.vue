<script setup lang="ts">
import type { Events } from '~/types/Events'

interface Props {
  event: Events
}

const { event } = defineProps<Props>()

</script>

<template>
  <event-view-channel
      v-if="event.type !== 'test'"
      :event="event"
  />
  <event-view-test
      v-else
      :event="event"
  />
</template>

<style scoped>

</style>