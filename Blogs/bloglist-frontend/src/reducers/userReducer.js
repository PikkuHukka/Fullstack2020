import loginService from '../services/login'

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

/*
 try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user: ', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('storageen laitto onnistuu?: ')

      setUser(user)
      console.log('set user onnistuu?')


      blogService.setToken(user.token)
    } catch (exception) {

    }
*/

export const setUser = (content) => {
  return async dispatch => {
    console.log('dispatchissa')
    const user = await loginService.login(content)
    console.log('user: ', user)

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
      data: content.username
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