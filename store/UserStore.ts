import type { UserDto } from '@/dto/auth/UserDto'
import { getLoginInfo } from '@/api/AuthRequests'
import { processResponse } from '@/util/ApiUtil'

export const useUserStore = defineStore('user-store', () => {
  const user: Ref<UserDto | undefined> = ref(undefined)

  const setUser = (data: UserDto | undefined) => {
    user.value = data
  }

  const clearUser = () => {
    user.value = undefined
  }

  const getUser = async () => {
    if(user.value === undefined) {
      user.value = await processResponse(getLoginInfo())
    }
    return readonly(user)
  }

  return {
    setUser,
    clearUser,
    getUser
  }
})