import type { ChannelId } from '~/types/ChannelId'

export type ChannelSearchResultDto = {
  channelId: ChannelId,
  detail: {
    displayName: string,
    channelDescription: string,
    channelImageUrl: string
  }
  liveState: {
    isOpen: boolean,
  }
}