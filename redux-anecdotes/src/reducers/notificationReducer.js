
const notificationReducer = (state = '', action) => {

  console.log('action.data: ', action.data)
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


export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const cancelNotification = (content) => {
  return {
    type: 'CANCEL_NOTIFICATION'
  }
}
export default notificationReducer