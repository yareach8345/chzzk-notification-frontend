<script setup lang="ts">
import type { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'
import { searchChannel } from '~/api/Chzzk'

interface Props {
  onChannelSelected: (channelId: ChannelSearchResultDto) => void | Promise<void>;
}

const { onChannelSelected } = defineProps<Props>();

const isOpen = defineModel<boolean>('isOpen', { required: true })

const searchResults = ref<ChannelSearchResultDto[]>([])

const closeModal = async () => {
  isOpen.value = false
}

const name = ref('')

const hasSubmit = ref(false)
const invalidClass = computed(() => hasSubmit.value ? ['invalid:border-neon-red'] : [])

const onSearchButtonClick = async () => {
  hasSubmit.value = true
}

const processChannelSearch = async () => {
  searchResults.value = await searchChannel(name.value)
}

const onSelectButtonClick = async (channel: ChannelSearchResultDto) => {
  onChannelSelected(channel)
  closeModal()
}
</script>

<template>
  <div
      v-if="isOpen"
      class="absolute left-0 top-0 w-full h-full z-30 bg-chzzk-black bg-opacity-50 flex items-center justify-center"
      @mousedown.left.prevent="closeModal"
  >
    <div @mousedown.left.stop class="border-4 rounded-lg p-4 bg-chzzk-black flex flex-col gap-2 border-chzzk-neon-green max-w-[90%]">
      <form @submit.prevent="processChannelSearch">
        <p class="text-md">
          채널명 :
        </p>
        <div class="flex justify-stretch gap-2">
          <input-text
              :class="[...invalidClass]"
              v-model="name"
              required
              min="1"
          />
          <button-neon submit @click="onSearchButtonClick">
            <svg-search/>
          </button-neon>
        </div>
      </form>
      <box-gray class="max-h-96 overflow-y-scroll">
        <div v-if="searchResults.length !== 0">
          <article
              class="p-2 grid grid-cols-[1fr_auto] gap-2"
              v-for="channel in searchResults"
              :key="channel.channelId"
          >
            <div class="flex gap-2">
              <channel-profile
                  class="w-20 h-20 object-cover"
                  :channel="channel"
              />
              <div class="flex flex-col justify-center">
                <h4 class="text-xl">{{channel.detail.displayName}}</h4>
                <p class="text-ellipsis">{{channel.detail.channelDescription}}</p>
                <p class="text-chzzk-stream-off text-sm max-sm:hidden">{{channel.channelId}}</p>
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <button-without-border
                  class="hover:text-chzzk-neon-green"
                  title="채널선택"
                  @click="() => onSelectButtonClick(channel)"
              >
                <svg-square-plus/>
              </button-without-border>
            </div>
          </article>
        </div>
        <div v-else class="text-center">
          채널을 검색 해주세요.
        </div>
      </box-gray>
      <div class="flex justify-center">
        <button-without-border
            class="hover:text-neon-red flex flex-col items-center gap-2"
            @click="closeModal"
        >
          <svg-cancel/>
          <p>취소</p>
        </button-without-border>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>