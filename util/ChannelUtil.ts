import type { ChannelDetailDto, LiveStateDto } from '~/dto/channel/ChannelInfoDto'
import { defaultChannelColor, liveOffColor } from '~/constants/ChannelInfo'

export const getBackgroundColorStyle = (channel: { detail: Pick<ChannelDetailDto, 'color'> }) => ({
  'backgroundColor': channel.detail.color ?? defaultChannelColor
})

export const getBorderColorStyle = (channel: { detail: Pick<ChannelDetailDto, 'color'>, liveState: Pick<LiveStateDto, 'isOpen'> }) => {
  return channel.liveState.isOpen
    ? channel.detail.color ?? defaultChannelColor
    : liveOffColor
}