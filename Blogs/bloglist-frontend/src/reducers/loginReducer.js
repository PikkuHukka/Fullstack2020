import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return action.data
    case 'CLEAR_LOGIN':
      return null
    default:
      return state
  }
}

export const setLogin = (content) => {
  return async dispatch => {
    const login = await loginService.login(content)
    window.localStorage.setItem(
      'loggedBlogappLogin', JSON.stringify(login)
    )
    dispatch({
      type: 'SET_LOGIN',
      data: login
    })
  }
}

export const setLoginFromToken = (content) => {
  return async dispatch => {

    dispatch({
      type: 'SET_LOGIN',
      data: content
    })
  }
}

export const clearLogin = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'CLEAR_LOGIN'
    })
  }
}


export default loginReducer