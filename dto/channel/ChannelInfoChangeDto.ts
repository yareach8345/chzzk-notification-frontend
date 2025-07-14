import type { LiveStateDto, ChannelDetailDto } from './ChannelInfoDto'

export type ChannelDetailChangeDto = Omit<ChannelDetailDto, 'channelDescription'>

export type LiveStateChangeDto = Omit<LiveStateDto, 'isOpen' | 'state' | 'tags'>

export type ChannelInfoChangeDto = ChannelDetailChangeDto & LiveStateChangeDto