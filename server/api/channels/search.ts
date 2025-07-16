import { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'

export default defineEventHandler(async (event): Promise<ChannelSearchResultDto[]> => {
  const { chzzkClient } = useNitroApp()
  const { name } = getQuery(event)

  const searchKeyword = Array.isArray(name) ? name[0] : name
  const result = await chzzkClient.search.channels(searchKeyword)

  return result.channels.map(channel => ({
    channelId: channel.channelId,
    displayName: channel.channelName,
    channelDescription: channel.channelDescription,
    channelImageUrl: channel.channelImageUrl,
    isLiveOpen: channel.openLive
  }))
})