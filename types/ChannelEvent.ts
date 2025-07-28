import type { ChannelId } from '~/types/Channel'

export interface ChannelEventBase {
  type: string
  timeOfEvent: Date
  channelId: ChannelId
}

export interface ChannelStateChangeEvent extends ChannelEventBase {
  type: 'state-change'
  newState: string
}

export interface ChannelInfoChangeEvent extends ChannelEventBase {
  type: 'info-change'
  changedInfos: Record<string, string | number>
}

export interface ChannelImageChangeEvent extends ChannelEventBase {
  type: 'image-change'
}

export type ChannelEvent = ChannelStateChangeEvent | ChannelInfoChangeEvent | ChannelImageChangeEvent