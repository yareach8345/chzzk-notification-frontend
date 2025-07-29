<script setup lang="ts">
import type { ChannelStateChangeEvent } from '~/types/Events'

interface Props {
  event: Pick<ChannelStateChangeEvent, 'newState'>
}

const { event } = defineProps<Props>()
</script>

<template>
  <div class="flex gap-1 items-center">
    <p class="font-bold">newState</p>
    <p>:</p>
    <p>{{event.newState}}</p>
  </div>
</template>

<style scoped>

</style>