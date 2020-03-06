import React from 'react'
import { connect } from 'react-redux'
import { newLike, removeBlog } from '../reducers/blogReducer'
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'




const Blogs = (props) => {

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {props.visibleBlogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`blogs/${blog.id}`} ><h3>{`${blog.title}`}</h3></Link>
              </td>

            </tr>

          )}
        </tbody>

      </Table>

    </div >

  )
}


const blogsToShow = ({ blogs }) => {
  return blogs

}


const dispatchToProps = {
  newLike,
  removeBlog,
  createSuccessNotification,
  clearNotification,
  createErrorNotification
}
const mapStateToProps = (state) => {
  return {
    visibleBlogs: blogsToShow(state),
    login: state.login
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Blogs)
