const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION': {
      return action.data
    }

    case 'REMOVE_NOTIFICATION': {
      return null
    }
    default:
      return state
  }
}


export const createErrorNotification = (content) => {
  const notificationObject = {
    message: content,
    type: 'error'
  }
  return {
    type: 'NEW_NOTIFICATION',
    data: notificationObject
  }
}

export const createSuccessNotification = (content) => {
  const notificationObject = {
    message: content,
    type: 'success'
  }
  return {
    type: 'NEW_NOTIFICATION',
    data: notificationObject
  }
}

export const clearNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}
export default notificationReducer
