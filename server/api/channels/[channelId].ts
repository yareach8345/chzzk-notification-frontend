import { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'

export default defineEventHandler(async (event): Promise<ChannelSearchResultDto> => {
  const channelId = event.context.params?.channelId
  const { chzzkClient } = useNitroApp()

  if(channelId === undefined) {
    throw createError({
      status: 500,
      message: '[ 서버 에러 ] 확인되지 않은 에러가 발생 했습니다.'
    })
  }

  const channel = await chzzkClient.channel(channelId)

  if(channel === null) {
    throw createError({
      status: 400,
      message: '채널을 찾을 수 없습니다. 채널 id를 확인 해주세요.'
    })
  }

  return {
    channelId: channel.channelId,
    displayName: channel.channelName,
    channelDescription: channel.channelDescription,
    imageUrl: channel.channelImageUrl,
    isLiveOpen: channel.openLive
  }
})