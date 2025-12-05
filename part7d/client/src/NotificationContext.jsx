import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.payload.message, type: action.payload.type || 'success' }
    case 'HIDE':
      return { message: null, type: null }
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null, type: null })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useNotify = () => {
  const dispatch = useNotificationDispatch()
  return (message, type = 'success') => {
    dispatch({ type: 'SHOW', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }
}

export default NotificationContext