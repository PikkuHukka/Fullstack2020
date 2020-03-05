import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setLogin } from '../reducers/loginReducer'



const LoginForm = (props) => {

  const [password, setpassword] = useState('')
  const [username, setusername] = useState('')

  const usernameChange = (event) => {
    setusername(event.target.value)
  }

  const passwordChange = (event) => {
    setpassword(event.target.value)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    props.setLogin({ username, password })

  }


  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            name='username'
            onChange={usernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            name='password'
            type="password"
            onChange={passwordChange}

          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}


const dispatchToProps = {
  setLogin
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(
  mapStateToProps,
  dispatchToProps
)(LoginForm)
