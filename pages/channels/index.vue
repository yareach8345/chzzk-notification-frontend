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

const numberOfPages = computed(() => Math.ceil(channels.value.length / pagingInfo.pageSize))

const moveToPage = async (page: number) => {
  const route = useRoute()

  await navigateTo({
    name: 'channels',
    query: {
      ...route.query,
      page,
    }
  })

  pagingInfo.page = page
}

const moveToNextPage = async () => {
  if(pagingInfo.page === numberOfPages.value) {
    return
  }

  await moveToPage(pagingInfo.page + 1)
}

const moveToPrePage = async () => {
  if(pagingInfo.page <= 1) {
    return
  }

  await moveToPage(pagingInfo.page - 1)
}

const moveToChannelDetailPage = async (channelId: string) => {
  await navigateTo(`channels/${channelId}`)
}
</script>

<template>
  <section>
    <box-gray class="p-3 relative flex flex-col gap-4">
      <h2 class="text-4xl text-center font-blackHan">
        채널 목록
      </h2>
      <div class="grid md:grid-cols-2 auto-cols-fr gap-2">
        <channel-card
            class="flex-none"
            :channel="channel"
            @click="async () => await moveToChannelDetailPage(channel.channelId)"
            v-for="channel in channelsInThisPage"
        />
      </div>
      <div class="flex justify-center items-center auto-cols-fr text-lg">
        <button-without-border
            title="이전 페이지로"
            @click="moveToPrePage"
        >
          &lt;
        </button-without-border>
        <span>{{pagingInfo.page}} / {{numberOfPages}}</span>
        <button-without-border
            title="다음 페이지로"
            @click="moveToNextPage"
        >
          &gt;
        </button-without-border>
      </div>
    </box-gray>
  </section>
</template>

<style scoped>

</style>