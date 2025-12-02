import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (_state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return ''
  default:
    return _state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  return dispatch
}

export const notify = (dispatch, message, seconds = 5) => {
  dispatch({ type: 'SET', payload: message })
  setTimeout(() => dispatch({ type: 'CLEAR' }), seconds * 1000)
}
