import { getCookieHeader } from '~/util/ApiUtil'

export const searchChannel = (keyword: string) => {
  const cookieHeader = getCookieHeader()

  return $fetch('/api/channels/search', {
    credentials: 'include',
    headers: { ...cookieHeader },
    query: { name: keyword }
  })
}

export const getChannelInfo = (channelId: string) => {
  const cookieHeader = getCookieHeader()

  return $fetch(`/api/channels/${channelId}`, {
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}