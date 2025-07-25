import type { ChannelId } from '~/types/Channel'

export type ChannelSearchResultDto = {
  channelId: ChannelId,
  detail: {
    displayName: string,
    channelDescription: string,
    channelImageUrl?: string
  }
  liveState: {
    isOpen: boolean,
    liveId?: string
  }
}