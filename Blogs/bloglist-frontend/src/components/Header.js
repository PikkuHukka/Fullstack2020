import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { clearLogin } from '../reducers/loginReducer'

const Header = (props) => {
  const padding = {
    padding: 5
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    props.clearLogin()
  }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <p>Logged in: {props.login.username}</p>
      <button onClick={handleLogout}>Logout </button>
    </div>
  )
}

const dispatchToProps = {
  clearLogin
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(
  mapStateToProps,
  dispatchToProps
)(Header)
