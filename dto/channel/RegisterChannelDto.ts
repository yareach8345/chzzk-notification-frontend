import type { ChannelId } from '~/types/Channel'

export interface RegisterChannelDto {
  channelId: ChannelId,
  priority?: number,
  color?: string
}