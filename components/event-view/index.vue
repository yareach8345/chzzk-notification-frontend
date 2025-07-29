<script setup lang="ts">
import type { ChannelEvents } from '~/types/Events'

interface Props {
  event: ChannelEvents
}

const { event } = defineProps<Props>()
</script>

<template>
  <event-view-channel :event="event"/>
</template>

<style scoped>

</style>