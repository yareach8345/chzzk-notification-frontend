import { checkAuth, openLoginPage } from '@/api/AuthRequests'
import { processResponse } from '~/util/ApiUtil'

export default defineNuxtRouteMiddleware( async () => {
  try {
    const data = await processResponse(checkAuth());

    if(data.isAuthenticated === false) {
      openLoginPage()
    }
  } catch (error) {
    console.error(error)
    abortNavigation()
  }
})