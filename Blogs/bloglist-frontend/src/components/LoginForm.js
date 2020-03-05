import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'



const LoginForm = (props) => {

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
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
