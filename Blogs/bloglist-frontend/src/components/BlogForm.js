import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'


const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const titleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const urlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const authorChange = (event) => {
    setNewAuthor(event.target.value)
  }


  const addBlog = (event) => {
    event.preventDefault()
    props.createBlog({
      title: newTitle,
      author: newAuthor,
      likes: 0,
      url: newUrl,
    }, props.user)

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')

  }


  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={newTitle}
            name="title"
            onChange={titleChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="author"
            onChange={authorChange}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={newUrl}
            name="url"
            onChange={urlChange}
          />
        </div>
        <button id="submit" type="submit">create</button>
      </form>
    </div>
  )
}

const dispatchToProps = {
  createBlog
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(BlogForm)

