import type { AuthCheckDto } from '@/dto/auth/AuthCheckDto'
import { getBackendUrl, getCookieHeader } from '~/util/ApiUtil'

export const authCheck = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/auth/check')

  return useFetch<AuthCheckDto>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const openLoginPage = () => {
  window.location.href = getBackendUrl('/auth/google-login')
}