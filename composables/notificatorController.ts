import { NotificatorController } from '~/core/modal/NotificatorController'

export const notificatorController: NotificatorController = new NotificatorController()

const _notificationType = ref('under')

const setNotificationType = (notificationType: string) => {
  _notificationType.value = notificationType
}

watch(_notificationType, (value) => {
  if(import.meta.client) {
    window.localStorage.setItem('notification-type', _notificationType.value);
  }

  setNotificationType(value)
})

export const getNotificationType = () => _notificationType

export const loadNotificationFromLocalStorage = () => {
  console.log("loadNotificationTypeFromLocalStorage")
  const initStyle = window.localStorage.getItem('notification-type') ?? 'under'
  setNotificationType(initStyle)
}
