import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"



const Users = (props) => {

  return (
    <div>
      <h3>Users</h3>
      {props.users ?
        < ul >
          {
            props.users.map(user =>
              <div key={user.id}>
                <Link to={`users/${user.id}`} >{`${user.username}`}</Link>
                <p>{` Total blogs: ${user.blogs.length}`} </p>
              </div>
            )
          }
        </ul>
        :
        null
      }


    </div >
  )
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users
  }
}

export default connect(
  mapStateToProps)(Users)
