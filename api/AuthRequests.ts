import type { AuthCheckDto } from '@/dto/auth/AuthCheckDto'
import type { AuthInfoDto } from '~/dto/auth/AuthInfoDto'
import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'

export const checkAuth = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/auth/check')

  return useFetch<AuthCheckDto>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const getAuthInfo = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/auth/login-info')

  return useFetch<AuthInfoDto>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const openLoginPage = () => {
  window.location.href = getBackendUrl('/auth/google-login')
}