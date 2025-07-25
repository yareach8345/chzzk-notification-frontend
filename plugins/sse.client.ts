import { SseController } from '~/sse/SseController'
import { getBackendUrl } from '~/util/ApiUtil'
import { useAuthInfoStore } from '~/store/AuthInfoStore'

export default defineNuxtPlugin(() => {
  const sseController = SseController.init({
    url: getBackendUrl('/sse/connect'),
    credentials: 'include'
  })

  const { isAuthenticated } = storeToRefs(useAuthInfoStore())

  watch(
    isAuthenticated,
    (newValue, oldValue) => {
      if(newValue === oldValue) { return }

      if(newValue) {
        sseController.connect()
      } else {
        sseController.disconnect()
      }
    }
  )
})