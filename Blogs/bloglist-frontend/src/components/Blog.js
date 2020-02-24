import React from 'react'
import Togglable from './Togglable'

const Blog = ({ newID, user, blog, handleLike, handleRemoveBlog }) => {

  console.log(user.id)
  console.log(blog.user.id)
  return (
    <div>
      <h2>{blog.title}</h2>
      <Togglable buttonID={"showmore" + newID} buttonLabel="Show more">
        < ul className='blog'>
          <li>Author: {blog.author}</li>
          <li >Likes: {blog.likes} </li> <button id={"like-button" + newID} onClick={() => handleLike(blog.id)}>Like</button>
          <li>URL: {blog.url}</li>
        </ul>
        {
          (user.id === blog.user.id) ?
            < button id={"remove" + newID} onClick={() => handleRemoveBlog(blog.id)}>Remove</button>
            : null}


      </Togglable>
    </div >
  )
}

export default Blog
