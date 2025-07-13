import type { AuthInfoDto } from '~/dto/auth/AuthInfoDto'
import { processAsyncData } from '~/util/ApiUtil'
import { getAuthInfo, requestLogout } from '~/api/AuthRequests'

export const useAuthInfoStore = defineStore('user-store', () => {
  const authInfo: Ref<AuthInfoDto | undefined> = ref(undefined)

  const loadAuthInfo = async () => {
    authInfo.value = await processAsyncData(getAuthInfo())
  }

  const logout = async () => {
    await requestLogout()
    authInfo.value = undefined
  }

  const isAuthenticated = computed(() => authInfo.value !== undefined)

  return {
    loadAuthInfo,
    logout,
    isAuthenticated,
    authInfo: computed(() => authInfo.value)
  }
})