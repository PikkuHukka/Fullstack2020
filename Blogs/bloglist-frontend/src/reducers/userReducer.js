import loginService from '../services/login'
import { createSuccessNotification } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return action.data
    case 'CLEAR_LOGIN':
      return null
    default:
      return state
  }
}

export const setUser = (content) => {
  return async dispatch => {
    const user = await loginService.login(content)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    dispatch({
      type: 'SET_LOGIN',
      data: user
    })
  }
}

export const setUserFromToken = (content) => {
  return async dispatch => {

    dispatch({
      type: 'SET_LOGIN',
      data: content
    })
  }
}

export const clearUser = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'CLEAR_LOGIN'
    })
  }
}


export default userReducer