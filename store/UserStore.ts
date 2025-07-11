import type { UserDto } from '~/dto/auth/UserDto'

export const useUserStore = defineStore('user-store', () => {
  const user: Ref<UserDto | undefined> = ref(undefined)

  const setUser = (data: UserDto | undefined) => {
    user.value = data
  }

  const clearUser = () => {
    user.value = undefined
  }

  return {
    setUser,
    clearUser,
    user: computed(() => user.value),
  }
})