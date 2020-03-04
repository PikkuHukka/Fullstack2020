import React from 'react'

import Togglable from './Togglable'


const Blog = ({ newID, blog, handleClick }) => {


  return (
    <div>
      <h2>{blog.title}</h2>
      <Togglable buttonID={"showmore" + newID} buttonLabel="Show more">
        < ul className='blog'>
          <li>Author: {blog.author}</li>
          <li >Likes: {blog.likes} </li>
          <button
            id={"like-button" + newID}
            onClick={handleClick}>Like</button>
          <li>URL: {blog.url}</li>
        </ul>
      </Togglable>
    </div >
  )
}



export default Blog
