import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'



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

      <Form onSubmit={handleLogin}>
        <Form.Group>

          <Form.Label>username:</Form.Label>

          <Form.Control
            id='username'
            name='username'
            onChange={usernameChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            name='password'
            type="password"
            onChange={passwordChange}

          />
          <Button id="login-button" variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>

      </Form>
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
