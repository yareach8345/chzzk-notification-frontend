<script setup lang="ts">
import { useChannelStore } from '~/store/ChannelStore'
import { calcStartAndEndIndexWithPage, getPagingInfoFromQuery } from '~/util/PagingUtil'

definePageMeta({
  middleware: ['require-auth', 'require-channel-info']
})

useHead({
  title: '채널'
})

const channelStore = useChannelStore()
const { channels } = storeToRefs(channelStore)

const pagingInfo = reactive(getPagingInfoFromQuery(10))

const channelsInThisPage = computed(() => {
  const indexes = calcStartAndEndIndexWithPage(pagingInfo)
  return channels.value.slice(indexes.start, indexes.end)
})

console.log(channelsInThisPage.value)
</script>

<template>
  <h2 class="text-2xl">
    채널 목록
  </h2>
  <section class="border-4 border-chzzk-border rounded-xl p-3">
    <div class="grid grid-cols-2 auto-cols-fr gap-2">
      <channel-card
          class="flex-none"
          :channel="channel"
          v-for="channel in channelsInThisPage"
      />
    </div>
  </section>
</template>

<style scoped>

</style>