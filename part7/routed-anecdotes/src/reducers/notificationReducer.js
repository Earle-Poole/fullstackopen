const initialNotification = {
  message: 'render here notification...',
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none',
  },
}

const displayNotification = (message) => ({
  type: 'SHOW_NOTIFICATION',
  message,
})

const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION',
})

export const setNotification = (message, timeout) => async (dispatch) => {
  const seconds = timeout * 1000
  dispatch(displayNotification(message))
  setTimeout(() => dispatch(hideNotification()), seconds)
}

const notificationReducer = (state = initialNotification, action) => {
  let newState

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      newState = {
        ...state,
        message: action.message,
        style: {
          ...state.style,
          display: '',
        },
      }
      return newState
    case 'HIDE_NOTIFICATION':
      newState = {
        ...state,
        style: {
          ...state.style,
          display: 'none',
        },
      }
      return newState
    default:
      return state
  }
}

export default notificationReducer
