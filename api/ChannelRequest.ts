import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'
import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'
import type { RegisterChannelDto } from '~/dto/channel/RegisterChannelDto'
import type { EditChannelDto } from '~/dto/channel/UpdateChannelDto'

export const getChannel = (channelId: string) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/${channelId}`)

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

export const deleteChannel = (channelId: string) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/${channelId}`)

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

export const updateChannel = (channelId: string, editChannelDto: EditChannelDto) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/channels/${channelId}`)

  return $fetch(url, {
    method: 'PATCH',
    body: editChannelDto,
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const openChzzkChannelPage = (channelId: string) => {
  const url = `https://chzzk.naver.com/${channelId}`
  window.open(url)
}

export const openChzzkChannelLivePage = (channelId: string) => {
  const url = `https://chzzk.naver.com/live/${channelId}`
  window.open(url)
}