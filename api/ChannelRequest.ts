import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'
import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'
import type { RegisterChannelDto } from '~/dto/channel/RegisterChannelDto'
import type { EditChannelDto } from '~/dto/channel/UpdateChannelDto'
import type { ChannelId } from '~/types/ChannelId'

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

export const openChzzkChannelPage = (chzzkChannelId: string) => {
  const url = `https://chzzk.naver.com/${chzzkChannelId}`
  window.open(url)
}

export const openChzzkChannelLivePage = (chzzkChannelId: string) => {
  const url = `https://chzzk.naver.com/live/${chzzkChannelId}`
  window.open(url)
}