import { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'

export default defineEventHandler(async (event): Promise<ChannelSearchResultDto[]> => {
  const { youtube } = useNitroApp()
  const { name } = getQuery(event)

  const keyword = Array.isArray(name) ? name[0] : name

  return youtube.search(keyword)
})