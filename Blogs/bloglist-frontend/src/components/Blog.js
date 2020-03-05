import React from 'react'

import Togglable from './Togglable'


const Blog = ({ blog, handleLike, handleRemove, user }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <Togglable buttonID={"showmore" + blog.id} buttonLabel="Show more">
        < ul className='blog'>
          <li>Author: {blog.author}</li>
          <li >Likes: {blog.likes} </li>
          <button
            id={"like-button" + blog.id}
            onClick={handleLike}>Like</button>
          <li>URL: {blog.url}</li>
          {user.username === blog.user.username ?
            <button
              id={"remove-button" + blog.id}
              onClick={handleRemove}>Remove</button>
            : null
          }

        </ul>
      </Togglable>
    </div >
  )
}


export default Blog

