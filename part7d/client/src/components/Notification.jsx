import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification || notification.message === null) return null

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
