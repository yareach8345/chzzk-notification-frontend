import type { AuthCheckDto } from '@/dto/auth/AuthCheckDto'
import type { UserDto } from '@/dto/auth/UserDto'
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

export const getLoginInfo = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/auth/login-info')

  return useFetch<UserDto>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}

export const openLoginPage = () => {
  window.location.href = getBackendUrl('/auth/google-login')
}