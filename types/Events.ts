import type { ChannelId } from '~/types/Channel'

export interface EventBase {
  type: string
}

export interface ChannelEventBase extends EventBase {
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

export interface TestEvent extends EventBase {
  type: 'test'
  testId?: string
  content: string
}

export type ChannelEvents = ChannelStateChangeEvent | ChannelInfoChangeEvent | ChannelImageChangeEvent

export type Events = ChannelEvents | TestEvent