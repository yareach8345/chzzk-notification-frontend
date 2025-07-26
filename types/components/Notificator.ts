import type { NotificationInfo } from '~/types/Notification'

export interface Notificator {
  showNotification: (notificationInfo: NotificationInfo) => void;
}