import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'
import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'
import type { MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'

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

  return useFetch<MinimalChannelInfoDto[]>(url, {
    method: 'GET',
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
