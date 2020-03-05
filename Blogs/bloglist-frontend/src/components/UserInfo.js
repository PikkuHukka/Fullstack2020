import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/userReducer'





const UserInfo = (props) => {



  const handleLogout = async (event) => {
    event.preventDefault()
    props.clearUser()
  }

  console.log(props.user)
  return (
    <div>
      <h3>Logged in: {props.user.username}</h3>
      <button onClick={handleLogout}>Logout </button>
    </div>
  )
}



const dispatchToProps = {
  clearUser

}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(UserInfo)
