const Notification = ({ notification }) => {
    console.log(notification)
  if (!notification || notification.message == null) return null;

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification