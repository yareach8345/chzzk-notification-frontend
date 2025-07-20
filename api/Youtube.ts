import { getCookieHeader } from '~/util/ApiUtil'

export const searchYoutubeChannel = (keyword: string) => {
  const cookieHeader = getCookieHeader()

  return $fetch('/api/youtube/channels/search', {
    credentials: 'include',
    headers: { ...cookieHeader },
    query: { name: keyword }
  })
}