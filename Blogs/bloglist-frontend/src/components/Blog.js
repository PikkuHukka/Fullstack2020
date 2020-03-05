import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Redirect, Route, useParams
} from "react-router-dom"
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { newLike, removeBlog, newComment } from '../reducers/blogReducer'

const Blog = (props) => {

  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = props.blogs.find(blog => blog.id === id)

  const commentChange = (event) => {
    setComment(event.target.value)
  }

  const likeHandler = async () => {
    props.newLike(blog.id)
    props.createSuccessNotification(`Liked blog ${blog.title}.`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }

  const handleComment = async (event) => {
    event.preventDefault()
    props.newComment(blog.id, comment)
    setComment('')
  }

  const removeHandler = async () => {

    if (!window.confirm(`Do you really want to remove ${blog.title}?`)) {
      return
    }
    props.createErrorNotification(`Removed ${blog.title}.`)
    props.removeBlog(blog.id)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)


  }

  if (!blog) {
    return (
      <div>
        <Route>
          <Redirect to="/" />
        </Route>
      </div>
    )
  } else {
    return (
      <div>
        <h2>{blog.title}</h2>
        <h3>Author: {blog.author}</h3>
        <h3>Likes: {blog.likes}</h3>
        <button onClick={() => likeHandler()}>Like</button>
        <p>Added by: {blog.user.username}</p>
        {blog.user.username === props.login.username ?
          <button onClick={() => removeHandler()}>Remove</button>
          : null}
        <h3>Comments:</h3>
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )
          }
          <form onSubmit={handleComment}>
            <div>
              Comment:
          <input
                id="comment"
                type="comment"
                value={comment}
                name="comment"
                onChange={commentChange}
              />
            </div>
            <button id="submit" type="submit">create</button>
          </form>
        </ul>
      </div>
    )
  }
}

const dispatchToProps = {
  createSuccessNotification,
  createErrorNotification,
  clearNotification,
  newLike,
  removeBlog,
  newComment
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    blogs: state.blogs
  }
}


export default connect(
  mapStateToProps,
  dispatchToProps
)(Blog)


