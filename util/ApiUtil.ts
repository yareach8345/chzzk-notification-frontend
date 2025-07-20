import type { AsyncData } from '#app'
import { FetchError } from 'ofetch'
import type { ChannelId } from '~/types/ChannelId'

export const getBackendUrl = (path: string) => {
  const config = useRuntimeConfig()

  if (!path.startsWith('/')) {
    throw new Error('path error : getBackendUrl 함수로 보내는 path는 \'/\'로 시작해야 합니다.')
  }

  return `${config.public.BACKEND_BASE_URL}${path}`
}

export const getChannelImageUrl = (channelId: ChannelId) => {
  return getBackendUrl(`/image/size/500/${channelId.platform}-${channelId.id}.png`)
}

export const getCookieHeader = () => import.meta.server ? useRequestHeaders(['cookie']) : {}

export const processAsyncData = async <ResponseType>(asyncData: AsyncData<ResponseType | null, FetchError<any> | null>): Promise<ResponseType> => {
  const { data, error } = await asyncData

  if(error.value !== null || data.value === null) {
    console.error(error.value)
    throw error.value
  }

  return data.value
}