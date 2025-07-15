import type { ChannelDetailDto } from '~/dto/channel/ChannelInfoDto'
import { defaultChannelColor } from '~/constants/ChannelInfo'

export const getBackgroundColorStyle = (channel: { detail: Pick<ChannelDetailDto, 'color'> }) => ({
  'backgroundColor': channel.detail.color ?? defaultChannelColor
})