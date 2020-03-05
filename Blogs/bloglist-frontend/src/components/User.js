import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"


const User = () => {
  const id = useParams().id

  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    return null
  } else {
    return (
      <div>
        <h2>Username: {user.username}</h2>
        <p>Full name: {user.name}</p>
        <h3>Blogs added by {user.username}</h3>
        <ul>
          {user.blogs.map(blog =>
            <div>
              <li>
                {blog.title}
              </li>
            </div>
          )
          }
        </ul>
      </div >
    )
  }
}



export default User

