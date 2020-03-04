import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

//Comps
import Blog from './components/Blog'
import Notification from './components/Notifications'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
//Services
import blogService from './services/blogs'
import loginService from './services/login'
//Reducers
import { initializeBlogs } from './reducers/noteReducer'

import "./App.css";



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort(function (a, b) {
          return b.likes - a.likes;
        });
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleLike = async (id, event) => {
    try {
      const filteredList = blogs.filter(b => {
        if (b.id === id) {
          return b
        }
      })
      var likedBlog = filteredList[0]

      const updatedBlog = {
        user: likedBlog.user,
        likes: likedBlog.likes + 1,
        author: likedBlog.author,
        title: likedBlog.title,
        url: likedBlog.url
      }


      var updatedList = blogs.filter(b => {
        if (b.id === id) {
          b.likes = b.likes + 1
        }
        return b
      })
      updatedList.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs(updatedList)



      const response = await blogService.update(id, updatedBlog)
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)



    } catch (exception) {
      setErrorMessage('Liking this blog did not work.')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }



  const handleRemoveBlog = async (id, event) => {

    if (!window.confirm("Do you really want to remove this blog?")) {
      return
    }

    try {
      const response = await blogService.remove(id)
      setErrorMessage('Blog was removed.')
      setErrorType('success')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)

      const newBlogs = blogs.filter(b => {
        return b.id !== id;
      });
      setBlogs(newBlogs)

    } catch (exception) {
      setErrorMessage('Removing blog did not work.')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }


  const logInPage = () => {

    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>

    )
  }

  const newBlog = () => {

    return (
      <Togglable id="new-blog" buttonLabel="new blog">
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const blogList = () => (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>Logout</button>
      <ul>
        {blogs.map((blog, index) =>
          <div key={index}>
            <Blog newID={index} user={user} blog={blog} handleLike={handleLike} handleRemoveBlog={handleRemoveBlog} />
          </div>
        )}
      </ul>
    </div >
  )


  return (
    <div>
      <h1>Blogs</h1>
      < Notification message={errorMessage} type={errorType} />
      {user === null ?
        logInPage()
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <Blogs />
          {/*blogList()*/}
          {newBlog()}
        </div>
      }
    </div>
  )

}



export default connect(null, { initializeBlogs })(App) 
