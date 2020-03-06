import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { createSuccessNotification, clearNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'


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

    props.createSuccessNotification(`Created new blog: ${newTitle}.`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)


    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')

  }


  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>

          <Form.Label> username:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={newTitle}
            name="title"
            onChange={titleChange}
          />

          <Form.Label> author:</Form.Label>
          <Form.Control

            id="author"
            type="text"
            value={newAuthor}
            name="author"
            onChange={authorChange}
          />
          <Form.Label> url:</Form.Label>

          <Form.Control
            id="url"
            type="text"
            value={newUrl}
            name="url"
            onChange={urlChange}
          />
          <Button id="submit-button" variant="primary" type="submit">
            Create Blog
          </Button>
        </Form.Group>
      </Form>
    </div >
  )
}

const dispatchToProps = {
  createBlog,
  createSuccessNotification,
  clearNotification
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

