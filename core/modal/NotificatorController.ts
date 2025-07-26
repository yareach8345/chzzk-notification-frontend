import type { Notificator } from '~/types/components/Notificator'
import type { NotificationInfo } from '~/types/Notification'

export class NotificatorController {
  private notification: Notificator | undefined = undefined

  register = (notification: Notificator): void => {
    this.notification = notification
  }

  showNotification = (notificationInfo: NotificationInfo): void => {
    if(this.notification === null) {
      console.error('알람 컴포넌트가 등록되어있지 않습니다.')
    }
    this.notification?.showNotification(notificationInfo)
  }
}