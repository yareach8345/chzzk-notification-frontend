import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'
import { getChannels as loadChannelsFromApi } from '~/api/ChannelRequest'
import { processAsyncData } from '~/util/ApiUtil'

export const useChannelStore = defineStore('channel-store', () => {
  const _channels = ref<ChannelInfoDto[]>([])

  const channelMap = computed(() => new Map(_channels.value.map(channel => ([channel.channelId, channel]))))

  const _isChannelsLoaded = ref(false)

  const loadChannels = async () => {
    _channels.value = await processAsyncData(loadChannelsFromApi())
    _isChannelsLoaded.value = true
  }

  const findChannelById = (channelId: string) => {
    return channelMap.value.get(channelId)
  }

  return {
    channels: computed(() => _channels.value),
    isChannelsLoaded: computed(() => _isChannelsLoaded.value),
    findChannelById,
    loadChannels,
  }
})