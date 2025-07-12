import { checkAuth, getAuthInfo, openLoginPage } from '@/api/AuthRequests'
import { processAsyncData } from '~/util/ApiUtil'
import { useAuthInfoStore } from '~/store/AuthInfoStore'

export default defineNuxtRouteMiddleware( async () => {
  try {
    const data = await processAsyncData(checkAuth());

    if(data.isAuthenticated === false) {
      openLoginPage()
    }

    const userStore = useAuthInfoStore()

    if(!userStore.isAuthenticated) {
      const user = await processAsyncData(getAuthInfo())

      userStore.setAuthInfo(user)
    }
  } catch (error) {
    console.error(error)
    abortNavigation()
  }
})