import { loadNotificationFromLocalStorage } from '~/composables/notificatorController'

export default defineNuxtPlugin(() => {
  loadNotificationFromLocalStorage()
})