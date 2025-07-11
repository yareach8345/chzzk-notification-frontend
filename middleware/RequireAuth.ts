import { authCheck, openLoginPage } from '@/api/AuthRequests'
import { useUserStore } from '~/store/UserStore'

export default defineNuxtRouteMiddleware( async () => {
  const { data, error } = await authCheck();

  if(error.value !== null || data.value === null) {
    console.error(error.value)
    return abortNavigation()
  }

  if(data.value.isAuthenticated === false) {
    openLoginPage()
  } else {
    const userStore = useUserStore()

    if(userStore.user === undefined) {
      userStore.setUser(data.value.user)
    }
  }
})