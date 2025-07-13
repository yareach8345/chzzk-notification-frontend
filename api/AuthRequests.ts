import type { AuthCheckDto } from '@/dto/auth/AuthCheckDto'
import type { AuthInfoDto } from '~/dto/auth/AuthInfoDto'
import { getBackendUrl, getCookieHeader } from '@/util/ApiUtil'
import { useAuthInfoStore } from '~/store/AuthInfoStore'

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

export const logout = async () => {
  const url = getBackendUrl('/auth/logout')
  const authInfoStore = useAuthInfoStore()
  const route = useRoute()

  await $fetch(url, {
    method: 'POST',
    credentials: 'include'
  })

  authInfoStore.clearAuthInfo()

  if(route.name === 'index') {
    window.location.reload()
  } else {
    navigateTo({ name: 'index' })
  }
}