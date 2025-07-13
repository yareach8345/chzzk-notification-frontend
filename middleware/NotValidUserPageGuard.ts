import { processAsyncData } from '~/util/ApiUtil'
import { checkAuth } from '~/api/AuthRequests'

export default defineNuxtRouteMiddleware(async () => {
  const authInfo = await processAsyncData(checkAuth())

  console.log(authInfo)

  if(!authInfo.isAuthenticated) {
    return navigateTo({ name: 'login' })
  }

  if(authInfo.isValidUser) {
    return navigateTo({ name: 'index' })
  }
})