const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION': {
      return ('Added new anecdote: ' + action.data)
    }
    case 'VOTE_NOTIFICATION': {
      return ('Voted: ' + action.data)
    }
    case 'REMOVE_NOTIFICATION': {
      return ''
    }
    default:
      return state
  }
}


export const createVoteNotification = (content) => {
  return {
    type: 'VOTE_NOTIFICATION',
    data: content
  }
}

export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const cancelNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}
export default notificationReducer
