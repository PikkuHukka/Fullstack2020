import React from 'react'
import { connect } from 'react-redux'
import { newLike, removeBlog } from '../reducers/blogReducer'
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { Link } from "react-router-dom"



const Blogs = (props) => {

  return (
    <div>
      <ul>
        {props.visibleBlogs.map(blog =>
          <div key={blog.id}>
            <Link to={`blogs/${blog.id}`} ><h3>{`${blog.title}`}</h3></Link>

          </div>
        )}
      </ul>
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
