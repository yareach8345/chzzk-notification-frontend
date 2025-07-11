export const getBackendUrl = (path: string) => {
  const config = useRuntimeConfig()

  if (!path.startsWith('/')) {
    throw new Error('path error : getBackendUrl 함수로 보내는 path는 \'/\'로 시작해야 합니다.')
  }

  return `${config.public.BACKEND_BASE_URL}${path}`
}

export const getCookieHeader = () => import.meta.server ? useRequestHeaders(['cookie']) : {}