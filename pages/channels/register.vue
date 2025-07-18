<script setup lang="ts">
import { defaultChannelColor } from '~/constants/ChannelInfo'

definePageMeta({
  middleware: ['require-auth']
})

import type { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'
import { registerChannel } from '~/api/ChannelRequest'
import { useChannelStore } from '~/store/ChannelStore'

const channelStore = useChannelStore()

const selectedChannel = ref<ChannelSearchResultDto | null>(null)

const clearSelectedChannel = () => {
  selectedChannel.value = null
}

const channelColor = ref(defaultChannelColor)

const channelPriority = ref<string | undefined>(undefined)

const isChannelPriorityDefault = computed(() => channelPriority.value === undefined || channelPriority.value === "")

const searchName = computed(() => {
  if(selectedChannel.value === null) {
    return ''
  }
  return `${selectedChannel.value.detail.displayName}(${selectedChannel.value.channelId})`
})

const isChannelSearchModalOpen = ref(false)

const onChannelSearchSuccess = (result: ChannelSearchResultDto) => {
  if(channelStore.channels.filter(c => c.channelId === result.channelId).length !== 0) {
    alert("채널이 이미 등록되어 잇어요")
    return
  }

  selectedChannel.value = result
}

const onChannelSearchButtonClick = async () => {
  isChannelSearchModalOpen.value = true
}

const onAddButtonClick = async () => {
  if(selectedChannel.value === null) {
    console.error('채널이 선택되지 않았습니다.')
    throw createError({
      message: '채널이 선택되지 않았습니다. 채널을 등록하기 위해서는 등록할 채널이 선택 되어야합니다.'
    })
  }

  const priority = channelPriority.value ? parseInt(channelPriority.value) : undefined

  if(priority !== undefined && isNaN(priority)) {
    console.error(`우선순위 입력이 잘못 되었습니다. ${channelPriority.value}`)
    throw createError({
      message: `우선순위 입력이 잘못 되었습니다. ${channelPriority.value}`
    })
  }

  await registerChannel({
    channelId: selectedChannel.value.channelId,
    color: channelColor.value,
    platform: 'chzzk',
    priority: priority
  })

  alert('채널 등록이 완료 되었습니다.')

  navigateTo({ name: 'channels' })
}
</script>

<template>
  <channel-search-modal
      v-model:is-open="isChannelSearchModalOpen"
      :on-channel-selected="onChannelSearchSuccess"
  />
  <section class="min-w-[70%]">
    <box-gray class="p-3 relative flex flex-col gap-4 items-center">
      <h2 class="text-4xl text-center font-blackHan">
        채널 등록
      </h2>
      <div>
        <div>
          <p>
            채널 ID
          </p>
          <div class="flex items-stretch gap-2">
            <input-text
                class="border-chzzk-border text-chzzk-border truncate"
                @click="onChannelSearchButtonClick"
                placeholder="채널을 검색 해주세요."
                v-model="searchName"
                disabled
            />
            <button-neon
                class="border"
                @click="onChannelSearchButtonClick"
                title="채널 검색 창 열기"
            >
              <svg-search />
            </button-neon>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <channel-profile
            class="w-20 h-20 object-cover"
            :channel="selectedChannel"
        />
        <div class="flex flex-col justify-center">
          <template v-if="selectedChannel !== null">
            <h4 class="text-xl">{{selectedChannel.detail.displayName}}</h4>
            <p class="text-ellipsis">{{selectedChannel.detail.channelDescription}}</p>
            <p class="text-chzzk-stream-off text-sm max-sm:hidden">{{selectedChannel.channelId}}</p>
          </template>
          <template v-else>
            <h4 class="text-xl">먼저 채널을 검색 해주세요.</h4>
          </template>
        </div>
        <div class="flex flex-col justify-center">
          <button-without-border
              class="hover:text-neon-red"
              title="채널 선택 취소"
              @click="clearSelectedChannel"
              v-if="selectedChannel !== null"
          >
            <svg-cancel/>
          </button-without-border>
        </div>
      </div>
      <form class="relative" @submit.prevent="onAddButtonClick">
        <div v-if="selectedChannel === null" class="bg-opacity-50 bg-chzzk-black w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <box-gray class="text-lg bg-chzzk-black border-chzzk-neon-green">
            채널선택을 먼저 진행 해주세요.
          </box-gray>
        </div>
        <div class="grid grid-cols-3 gap-3 items-center justify-center">
          <p class="text-right font-bold">채널 컬러</p>
          <input
              type="color"
              v-model="channelColor"
              class="w-24"
          >
          <p>{{channelColor}}</p>
          <p class="text-right font-bold">우선순위</p>
          <input-number
              v-model="channelPriority"
              :min="0"
              :max="255"
              class="w-24 invalid:text-neon-red"
          ></input-number>
          <p v-if="isChannelPriorityDefault" class="text-chzzk-stream-off">(기본값)</p>
          <p v-else>{{channelPriority}}</p>
          <button-neon
              submit
              class="col-start-2"
          >
            채널 추가
          </button-neon>
        </div>
      </form>
    </box-gray>
  </section>
</template>

<style scoped>

</style>