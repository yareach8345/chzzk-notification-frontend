import type { Channel } from 'chzzk'
import type { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'
import { defaultChannelImage } from '~/constants/ChannelInfo'

export const chzzkChannelToSearchResult = (channel: Channel): ChannelSearchResultDto => ({
  channelId: {
    platform: 'chzzk',
    id: channel.channelId
  },
  detail: {
    displayName: channel.channelName,
    channelDescription: channel.channelDescription,
    channelImageUrl: channel.channelImageUrl ?? defaultChannelImage,
  },
  liveState:{
    isOpen: channel.openLive
  }
})