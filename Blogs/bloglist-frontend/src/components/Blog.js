import React from 'react'

import Togglable from './Togglable'


const Blog = ({ newID, blog, handleLike, handleRemove, user }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <Togglable buttonID={"showmore" + newID} buttonLabel="Show more">
        < ul className='blog'>
          <li>Author: {blog.author}</li>
          <li >Likes: {blog.likes} </li>
          <button
            id={"like-button" + newID}
            onClick={handleLike}>Like</button>
          <li>URL: {blog.url}</li>
          {user === blog.user.username ?
            <button
              id={"remove-button" + newID}
              onClick={handleRemove}>Remove</button>
            : null
          }

        </ul>
      </Togglable>
    </div >
  )
}


export default Blog

