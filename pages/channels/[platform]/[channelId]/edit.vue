<script setup lang="ts">
import { getChannelIdFromRoute, isValidPriorityInput, parsePriority } from '~/util/ChannelUtil'

definePageMeta({
  middleware: ['require-auth']
})

import { updateChannel } from '~/api/ChannelRequest'
import { useChannelStore } from '~/store/ChannelStore'
import { getPlatformImageInfo } from '~/util/ApiUtil'
import type { Input } from '~/types/components/Input'

const channelStore = useChannelStore()

const route = useRoute()

const channelId = getChannelIdFromRoute(route)
const channel = channelStore.findChannelById(channelId)

if(channel.value === undefined) {
  throw createError({
    message: `${channelId} 채널은 존재하지 않습니다.`
  })
}

const channelColor = ref(channel.value.detail.color)

const channelPriority = ref<string | undefined>(channel.value.detail.priority?.toString() ?? undefined)

const isChannelPriorityDefault = computed(() => channelPriority.value === undefined || channelPriority.value === "")

// input 태그 컨트롤
const priorityInputRef = ref<Input | undefined>()

const onEditButtonClick = async () => {
  const isSucceed = await spinnerController.withSpinner('채널 등록중입니다.', processEditing)

  if (isSucceed) {
    navigateTo({name: 'channels'})
  }
}

const processEditing = async () => {
  if(channel.value === undefined) {
    throw createError({
      message: 'channel이 undefined입니다. 비정상적인 오류. 해결바람.'
    })
  }

  const validResult = isValidPriorityInput(channelPriority.value)

  if(typeof validResult === 'string') {
    priorityInputRef.value?.showError(validResult)
    return
  }

  const priority = parsePriority(channelPriority.value)
  if(priority !== undefined && isNaN(priority)) {
    return false
  }

  await updateChannel(channelId, {
    color: channelColor.value,
    priority: priority
  })

  await channelStore.loadChannels()

  await alertController.open({
    title: '채널 업데이트 완료!',
    content: [
      '채널 정보가 수정되었습니다.',
      '채널 목록으로 이동합니다.'
    ]
  })
  return true
}

const platformImgInfo = computed(() => channel.value
      ? getPlatformImageInfo(channel.value.channelId.platform)
      : undefined
)

const toBack = async () => {
  const router = useRouter()
  router.back()
}
</script>

<template>
  <section class="min-w-[70%]">
    <box class="p-3 relative flex flex-col gap-4 items-center">
      <h2 class="text-4xl text-center font-blackHan">
        채널 수정
      </h2>
      <div class="flex gap-2">
        <channel-profile
            class="w-20 h-20 object-cover"
            :channel="channel"
        />
        <div class="flex flex-col justify-center">
            <div class="flex items-center gap-1">
              <img class="w-6" :src="platformImgInfo?.src" :alt="platformImgInfo?.alt" />
              <h4 class="text-xl">{{channel?.detail.displayName}}</h4>
            </div>
            <p class="text-stream-off text-sm max-sm:hidden">{{channel?.channelId.id}}</p>
        </div>
      </div>
      <form class="relative" @submit.prevent="onEditButtonClick">
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
            수정
          </button-neon>
        </div>
      </form>
    </box>
    <button-without-border
        class="hover:text-primary"
        title="채널목록으로"
        @click="toBack"
    >
      <svg-back/>
    </button-without-border>
  </section>
</template>

<style scoped>

</style>