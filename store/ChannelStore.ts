import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'
import { getChannels as loadChannelsFromApi } from '~/api/ChannelRequest'
import { processAsyncData } from '~/util/ApiUtil'

export const useChannelStore = defineStore('channel-store', () => {
  const channels = ref<ChannelInfoDto[]>([])

  const readonlyChannels = computed(() => channels.value)

  const isChannelsLoaded = ref(false)

  const loadChannels = async () => {
    channels.value = await processAsyncData(loadChannelsFromApi())
    isChannelsLoaded.value = true
  }

  const getChannels = async () => {
    if(isChannelsLoaded.value !== true) {
      await loadChannels()
    }
    return readonlyChannels
  }

  return {
    getChannels
  }
})