import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'



const Users = (props) => {

  return (
    <div>
      <h3>Users</h3>

      {props.users ?
        <Table striped>
          <tbody>
            {props.users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`users/${user.id}`} >
                    {`${user.username}`}
                  </Link>
                </td>
                <td>
                  {` Total blogs: ${user.blogs.length}`}
                </td>
              </tr>
            )
            }
          </tbody>

        </Table>
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
