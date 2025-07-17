import type { Channel } from 'chzzk'
import type { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'

export const chzzkChannelToSearchResult = (channel: Channel): ChannelSearchResultDto => ({
  channelId: channel.channelId,
  detail: {
    displayName: channel.channelName,
    channelDescription: channel.channelDescription,
    channelImageUrl: channel.channelImageUrl ?? "https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png",
  },
  liveState:{
    isOpen: channel.openLive
  }
})