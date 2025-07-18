export type ChannelSearchResultDto = {
  channelId: string
  detail: {
    displayName: string,
    channelDescription: string,
    channelImageUrl: string
  }
  liveState: {
    isOpen: boolean,
  }
}