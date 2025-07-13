import { processAsyncData } from '~/util/ApiUtil'
import { checkAuth } from '~/api/AuthRequests'

export default defineNuxtRouteMiddleware(async () => {
  const authInfo = await processAsyncData(checkAuth())

  if(!authInfo.isAuthenticated) {
    return
  }

  if(authInfo.isValidUser) {
    return navigateTo({ name: 'index' })
  }

  return navigateTo({ name: 'not-valid-user', })
})