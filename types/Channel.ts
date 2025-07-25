export interface ChannelId {
  platform: string,
  id: string
}

export type ChannelStateChangeCallback = (channelId: ChannelId, newState: 'open' | 'closed' | 'added' | 'deleted') => void