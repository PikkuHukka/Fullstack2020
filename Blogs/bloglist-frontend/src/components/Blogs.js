import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { newLike, removeBlog } from '../reducers/blogReducer'
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { Link } from "react-router-dom"



const Blogs = (props) => {



  const likeHandler = async (blog) => {
    props.newLike(blog.id)
    props.createSuccessNotification(`Liked blog ${blog.title}.`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }
  const removeHandler = async (blog) => {

    if (!window.confirm(`Do you really want to remove ${blog.title}?`)) {
      return
    }
    props.createErrorNotification(`Removed ${blog.title}.`)
    props.removeBlog(blog.id)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)

  }

  /* 
  
  <Blog
                blog={blog}
                handleLike={() =>
                  likeHandler(blog)}
                handleRemove={() =>
                  removeHandler(blog)}
                login={props.login}
              />
  */
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
