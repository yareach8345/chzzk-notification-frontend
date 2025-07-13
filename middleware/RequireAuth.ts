import { checkAuth } from '@/api/AuthRequests'
import { processAsyncData } from '~/util/ApiUtil'
import { useAuthInfoStore } from '~/store/AuthInfoStore'

export default defineNuxtRouteMiddleware( async () => {
  try {
    const data = await processAsyncData(checkAuth());

    if(data.isAuthenticated === false) {
      return navigateTo({ name: 'login' })
    }

    if(data.isValidUser === false) {
      return navigateTo({ name: 'not-valid-user' })
    }

    const userStore = useAuthInfoStore()

    if(!userStore.isAuthenticated) {
      await userStore.loadAuthInfo()
    }
  } catch (error) {
    if(import.meta.client) {
      alert(`로그인 실패 : ${error}`)
    }
    console.error(error)
    abortNavigation()
  }
})