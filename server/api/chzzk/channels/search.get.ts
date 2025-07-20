import { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'
import { chzzkChannelToSearchResult } from '~/util/ChzzkUtil'

export default defineEventHandler(async (event): Promise<ChannelSearchResultDto[]> => {
  const { chzzkClient } = useNitroApp()
  const { name } = getQuery(event)

  const searchKeyword = Array.isArray(name) ? name[0] : name
  const result = await chzzkClient.search.channels(searchKeyword)

  return result.channels.map(chzzkChannelToSearchResult)
})