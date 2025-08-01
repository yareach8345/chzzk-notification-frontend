<script setup lang="ts">
import { defaultChannelColor } from '~/constants/ChannelInfo'

definePageMeta({
  middleware: ['require-auth', 'require-channel-info']
})

import type { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'
import { registerChannel } from '~/api/ChannelRequest'
import { useChannelStore } from '~/store/ChannelStore'
import { platforms } from '~/constants/platforms'
import { isEqualChannelId, isValidPriorityInput, parsePriority } from '~/util/ChannelUtil'
import { getPlatformImageInfo } from '~/util/ApiUtil'
import type { Input } from '@/types/components/Input'

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
  return `${selectedChannel.value.detail.displayName}(${selectedChannel.value.channelId.id})`
})

const isChannelSearchModalOpen = ref(false)

const onChannelSearchSuccess = async (result: ChannelSearchResultDto) => {
  if(channelStore.channels.filter(c => isEqualChannelId(c.channelId, result.channelId)).length !== 0) {
    await alertController.open({
      title: '이미 등록된 채널입니다.',
      content: '아직 등록되지 않은 채널만 등록할 수 있습니다.'

    })
    return
  }

  selectedChannel.value = result
}

const onChannelSearchButtonClick = async () => {
  isChannelSearchModalOpen.value = true
}

// input 태그 컨트롤
const selectedPlatform = ref(platforms[0])

const priorityInputRef = ref<Input | undefined>()

const onPlatformSelectChange = () => {
  console.log(selectedPlatform.value)
  selectedChannel.value = null
}

const onAddButtonClick = async () => {
  const isSucceed = await spinnerController.withSpinner('채널 등록중입니다.', processRegistering)

  if (isSucceed) {
    navigateTo({name: 'channels'})
  }
}

const processRegistering = async () => {
  if(selectedChannel.value === null) {
    console.error('채널이 선택되지 않았습니다.')
    throw createError({
      message: '채널이 선택되지 않았습니다. 채널을 등록하기 위해서는 등록할 채널이 선택 되어야합니다.'
    })
  }

  const validResult = isValidPriorityInput(channelPriority.value)

  if(typeof validResult === 'string') {
    priorityInputRef.value?.showError(validResult)
    return
  }

  const priority = parsePriority(channelPriority.value)

  await registerChannel({
    channelId: {
      platform: selectedPlatform.value,
      id: selectedChannel.value.channelId.id
    },
    color: channelColor.value,
    priority: priority
  })

  await channelStore.loadChannels()

  await alertController.open({
    title: '채널 등록 완료!',
    content: [
        '채널 등록이 완료되었습니다.',
        '채널 목록으로 이동합니다.'
    ]
  })
  return true
}

const platformImgInfo = computed(() => getPlatformImageInfo(selectedPlatform.value))

const navigateToChannelListPage = async () => {
  navigateTo({ name: 'channels' })
}
</script>

<template>
  <channel-search-modal
      v-model:is-open="isChannelSearchModalOpen"
      :on-channel-selected="onChannelSearchSuccess"
      :platform="selectedPlatform"
  />
  <section class="min-w-[70%]">
    <box class="p-3 relative flex flex-col gap-4 items-center">
      <h2 class="text-4xl text-center font-blackHan">
        채널 등록
      </h2>
      <div class="relative">
        <p>플랫폼</p>
        <input-platform-selector
            v-model="selectedPlatform"
            @onChange="onPlatformSelectChange"
        />
      </div>
      <div>
        <div>
          <p>채널 ID</p>
          <div class="flex items-stretch gap-2">
            <input-text
                class="border-default text-chzzk-border truncate"
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
            :channel="selectedChannel ?? undefined"
            :channel-image-url="selectedChannel?.detail.channelImageUrl"
        />
        <div class="flex flex-col justify-center">
          <template v-if="selectedChannel !== null">
            <div class="flex items-center gap-1">
              <img class="w-7" :src="platformImgInfo?.src" :alt="platformImgInfo?.alt" />
              <h4 class="text-xl">{{selectedChannel.detail.displayName}}</h4>
            </div>
            <p class="text-ellipsis">{{selectedChannel.detail.channelDescription}}</p>
            <p class="text-stream-off text-sm max-sm:hidden">{{selectedChannel.channelId.id}}</p>
          </template>
          <template v-else>
            <h4 class="text-xl">먼저 채널을 검색 해주세요.</h4>
          </template>
        </div>
        <div class="flex flex-col justify-center">
          <button-without-border
              class="hover:text-error"
              title="채널 선택 취소"
              @click="clearSelectedChannel"
              v-if="selectedChannel !== null"
          >
            <svg-cancel/>
          </button-without-border>
        </div>
      </div>
      <form class="relative" @submit.prevent="onAddButtonClick">
        <div v-if="selectedChannel === null" class="bg-opacity-50 bg-default w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <box class="text-lg bg-default border-primary">
            채널선택을 먼저 진행 해주세요.
          </box>
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
          <div>
            <input-number
                ref="priorityInputRef"
                v-model="channelPriority"
                :min="0"
                :max="255"
                class="w-24"
            ></input-number>
          </div>
          <p v-if="isChannelPriorityDefault" class="text-stream-off">(기본값)</p>
          <p v-else>{{channelPriority}}</p>
          <button-neon
              submit
              class="col-start-2"
          >
            채널 추가
          </button-neon>
        </div>
      </form>
    </box>
    <button-without-border
        class="hover:text-primary"
        title="채널목록으로"
        @click="navigateToChannelListPage"
    >
      <svg-back/>
    </button-without-border>
  </section>
</template>

<style scoped>

</style>