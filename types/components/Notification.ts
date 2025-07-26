import type { NotificationInfo } from '~/types/Notification'

export interface Notification {
  showNotification: (notificationInfo: NotificationInfo) => void;
}