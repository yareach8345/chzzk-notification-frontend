import type { Notification } from '@/types/components/Notification'
import type { NotificationInfo } from '~/types/Notification'

export class NotificationController {
  private notification: Notification | undefined = undefined

  register = (notification: Notification): void => {
    this.notification = notification
  }

  showNotification = (notificationInfo: NotificationInfo): void => {
    if(this.notification === null) {
      console.error('알람 컴포넌트가 등록되어있지 않습니다.')
    }
    this.notification?.showNotification(notificationInfo)
  }
}