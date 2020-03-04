import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'



const LoginForm = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    console.log('username: ', username)
    console.log('password: ', password)

    props.setUser({ username, password })


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
          />
        </div>
        <div>
          password
          <input
            id='password'
            name='password'
            type="password"
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}


const dispatchToProps = {
  setUser
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(
  mapStateToProps,
  dispatchToProps
)(LoginForm)
