import { authCheck, openLoginPage } from '@/api/AuthRequests'

export default defineNuxtRouteMiddleware( async () => {
  const { data, error } = await authCheck();

  console.log('received response')
  console.log(data.value?.isAuthenticated)

  if(error.value !== null || data.value === null) {
    console.error(error.value)
    throw error.value
  }

  if(data.value.isAuthenticated === false) {
    openLoginPage()
  }
})