import { LiveStateDto } from "./LiveStateDto";
import { ChannelDetailDto } from './ChannelDetailDto'

export interface ChannelInfoDto {
  channelId: string
  platform: string,
  detail: ChannelDetailDto,
  liveState: LiveStateDto,
}