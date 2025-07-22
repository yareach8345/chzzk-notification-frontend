import { getMinimalChannels } from '~/api/ChannelRequest'
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'
import { channelIdToString, sortChannels } from '~/util/ChannelUtil'
import type { ChannelId } from '~/types/ChannelId'

export const useChannelStore = defineStore('channel-store', () => {
  const _channels = ref<MinimalChannelInfoDto[]>([])

  const channelMap = computed(() => new Map(_channels.value.map(channel => ([channelIdToString(channel.channelId), channel]))))

  const _isChannelsLoaded = ref(false)

  const loadChannels = async () => {
    _channels.value = await getMinimalChannels()
    _isChannelsLoaded.value = true
  }

  const findChannelById = (channelId: ChannelId) => computed(() => channelMap.value.get(channelIdToString(channelId)))

  return {
    channels: computed(() => sortChannels(_channels.value)),
    isChannelsLoaded: computed(() => _isChannelsLoaded.value),
    findChannelById,
    loadChannels,
  }
})