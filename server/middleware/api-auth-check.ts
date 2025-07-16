import { AuthCheckDto } from '~/dto/auth/AuthCheckDto'
import { getBackendUrl } from '~/util/ApiUtil'

export default defineEventHandler(async (event) => {
  const path = event.path
  console.log(path)
  if(!path.startsWith('/api')) {
    return
  }

  const authUrl = getBackendUrl('/auth/check')
  const userCookies = getHeader(event, 'cookie') || ''

  const result = await $fetch<AuthCheckDto>(authUrl, {
    headers: { cookie: userCookies }
  })

  if(!result.isAuthenticated) {
    throw createError({
      status: 400,
      statusText: '인증 실패',
      message: '이 작업을 위해서는 인증이 필요합니다.'
    })
  }

  if(!result.isValidUser) {
    throw createError({
      status: 403,
      statusText: '허용되지 않은 유저',
      message: '이 사이트는 개인적인 목적을 위해 만들어진 사이트로 허용된 계정만 접근이 가능합니다.'
    })
  }
})