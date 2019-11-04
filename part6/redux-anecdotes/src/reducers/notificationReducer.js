const initialNotification = {
  message: 'render here notification...',
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none',
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    const seconds = timeout * 1000
    dispatch(displayNotification(message))
    setTimeout(() => dispatch(hideNotification()), seconds)
  }
}

const displayNotification = message => {
  return { 
    type: 'SHOW_NOTIFICATION',
    message: message,
   }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

const notificationReducer = (state = initialNotification, action) => {
  let newState

  switch ( action.type ) {
    case 'SHOW_NOTIFICATION':
      newState = { 
        ...state, 
        message: action.message, 
        style: { 
          ...state.style, 
          display: ''
        }
      }
      return newState
    case 'HIDE_NOTIFICATION':
      newState = {
        ...state,
        style: {
          ...state.style,
          display: 'none'
        }
      }
      return newState
    default:
      return state
  }
}

export default notificationReducer
