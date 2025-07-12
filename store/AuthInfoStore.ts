import type { AuthInfoDto } from '~/dto/auth/AuthInfoDto'

export const useAuthInfoStore = defineStore('user-store', () => {
  const authInfo: Ref<AuthInfoDto | undefined> = ref(undefined)

  const setAuthInfo = (data: AuthInfoDto | undefined) => {
    authInfo.value = data
  }

  const clearAuthInfo = () => {
    authInfo.value = undefined
  }

  const isAuthenticated = computed(() => authInfo.value !== undefined)

  return {
    setAuthInfo,
    clearAuthInfo,
    isAuthenticated,
    authInfo: computed(() => authInfo.value)
  }
})