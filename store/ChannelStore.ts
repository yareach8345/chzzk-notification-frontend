import { getMinimalChannels } from '~/api/ChannelRequest'
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'

export const useChannelStore = defineStore('channel-store', () => {
  const _channels = ref<MinimalChannelInfoDto[]>([])

  const channelMap = computed(() => new Map(_channels.value.map(channel => ([channel.channelId, channel]))))

  const _isChannelsLoaded = ref(false)

  const loadChannels = async () => {
    _channels.value = await getMinimalChannels()
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