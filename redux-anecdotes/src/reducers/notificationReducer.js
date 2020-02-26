
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION': {

      return ('Added new anecdote: ' + action.data)
    }
    case 'CANCEL_NOTIFICATION': {
      return ''
    }
    default:
      return state
  }
}


export const createNotification = (content, seconds) => {
  setTimeout(() => {
    cancelNotification()
  }, seconds * 1000)
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const cancelNotification = () => {
  return {
    type: 'CANCEL_NOTIFICATION'
  }
}
export default notificationReducer