import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { newLike, removeBlog, initializeBlogs } from '../reducers/blogReducer'
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import Blog from './Blog'



const Blogs = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

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


  return (
    <div>
      <ul>
        {props.visibleBlogs.map(blog =>
          <div key={blog.id}>
            <Blog
              blog={blog}
              handleLike={() =>
                likeHandler(blog)}
              handleRemove={() =>
                removeHandler(blog)}
              user={props.user}
            />
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
  initializeBlogs,
  createSuccessNotification,
  clearNotification,
  createErrorNotification
}
const mapStateToProps = (state) => {
  return {
    visibleBlogs: blogsToShow(state),
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Blogs)
