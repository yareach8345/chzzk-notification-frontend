import type { ChannelDetailDto, LiveStateDto } from '~/dto/channel/ChannelInfoDto'
import { defaultChannelColor, liveOffColor } from '~/constants/ChannelInfo'
import type { ChannelId } from '~/types/ChannelId'
import type { RouteLocationNormalizedGeneric, RouteParamsGeneric } from '#vue-router'

export const getBackgroundColorStyle = (channel: { detail: Pick<ChannelDetailDto, 'color'> }) => ({
  'backgroundColor': channel.detail.color ?? defaultChannelColor
})

export const getBorderColorStyle = (channel: { detail: Pick<ChannelDetailDto, 'color'>, liveState: Pick<LiveStateDto, 'isOpen'> }) => {
  return channel.liveState.isOpen
    ? channel.detail.color ?? defaultChannelColor
    : liveOffColor
}

export const isEqualChannelId = (channelId1: ChannelId, channelId2: ChannelId) => {
  return channelId1.platform === channelId2.platform && channelId1.id === channelId2.id
}

export const channelIdToString = (channelId: ChannelId) => `${channelId.platform}-${channelId.id}`

export const getChannelIdFromRoute = (route: RouteLocationNormalizedGeneric): ChannelId => {
  const platform = Array.isArray(route.params.platform) ? route.params.platform[0] : route.params.platform
  const channelId = Array.isArray(route.params.channelId) ? route.params.channelId[0] : route.params.channelId

  return {
    platform,
    id: channelId
  }
}