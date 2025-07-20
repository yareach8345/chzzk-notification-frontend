import type { ChannelId } from '~/types/ChannelId'

export interface RegisterChannelDto {
  channelId: ChannelId,
  priority?: number,
  color?: string
}