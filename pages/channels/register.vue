<script setup lang="ts">
import type { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'

const selectedChannel = ref<ChannelSearchResultDto | undefined>(undefined)

const searchName = computed(() => {
  if(selectedChannel.value === undefined) {
    return ''
  }
  return `${selectedChannel.value.detail.displayName}(${selectedChannel.value.channelId})`
})

const isChannelSearchModalOpen = ref(false)

const onChannelSearchSuccess = (result: ChannelSearchResultDto) => {
  selectedChannel.value = result
}

const onChannelSearchButtonClick = async () => {
  isChannelSearchModalOpen.value = true
}
</script>

<template>
  <channel-search-modal
      v-model:is-open="isChannelSearchModalOpen"
      :on-channel-selected="onChannelSearchSuccess"
  />
  <section>
    <box-gray class="p-3 relative flex flex-col gap-4">
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
    </box-gray>
  </section>
</template>

<style scoped>

</style>