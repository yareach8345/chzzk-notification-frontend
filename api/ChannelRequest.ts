import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'
import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'
import type { MinimalChannelInfoDto, MinimalLiveStateDto } from '~/dto/channel/MinimalChannelInfoDto'
import type { RegisterChannelDto } from '~/dto/channel/RegisterChannelDto'
import type { EditChannelDto } from '~/dto/channel/UpdateChannelDto'
import type { ChannelId } from '~/types/Channel'

export const getChannel = (channelId: ChannelId) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/${channelId.platform}/${channelId.id}`)

  return useFetch<ChannelInfoDto>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const getMinimalChannels = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/channels/minimal')

  return $fetch<MinimalChannelInfoDto[]>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const getMinimalLiveState = (channelId: ChannelId) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/minimal/${channelId.platform}/${channelId.id}/state`)

  return $fetch<MinimalLiveStateDto>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const deleteChannel = (channelId: ChannelId) => {
  console.log(channelId)
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/${channelId.platform}/${channelId.id}`)

  return $fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const registerChannel = (registerChannelDto: RegisterChannelDto) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels`)

  return $fetch(url, {
    method: 'POST',
    body: registerChannelDto,
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const updateChannel = (channelId: ChannelId, editChannelDto: EditChannelDto) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/${channelId.platform}/${channelId.id}`)

  return $fetch(url, {
    method: 'PATCH',
    body: editChannelDto,
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const openChannelPage = (channelId: ChannelId) => {
  switch (channelId.platform) {
    case 'chzzk':
      window.open(`https://chzzk.naver.com/${channelId.id}`)
      break
    case 'youtube':
      window.open(`https://youtube.com/channel/${channelId.id}`)
      break
    default:
      throw createError({
        status: 400,
        message: '지원하지 않는 플렛폼입니다.'
      })
  }
}

export const openChannelLivePage = (channelId: ChannelId, liveId?: string) => {
  switch (channelId.platform) {
    case 'chzzk':
      window.open(`https://chzzk.naver.com/live/${channelId.id}`)
      break
    case 'youtube':
      window.open(`https://www.youtube.com/watch?v=${liveId}`)
      break
    default:
      throw createError({
        status: 400,
        message: '지원하지 않는 플렛폼입니다.'
      })
  }
}