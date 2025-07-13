import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'
import type { ChannelInfoDto } from '~/dto/channel/ChannelInfoDto'

export const getChannels = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/channels')

  return useFetch<ChannelInfoDto[]>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}