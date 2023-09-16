export type Notification = {
  id: string
  title: string
  body: string
  createdAt: string
  status: NotificationStatus
}

export enum NotificationStatus {
  Created = 'Created',
  Sent = 'Sent', // to be Sent is to be rendered at a client-side frontend
  Notified = 'Notified', // to be Notified is to be explicitly alerted using means such as popups, audio or push notification
  Read = 'Read',
  Failed = 'Failed'
}