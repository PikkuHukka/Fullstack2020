
import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
//Components
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import UserInfo from './components/UserInfo'
import LoginForm from './components/LoginForm'

//Reducers
import { initializeBlogs } from './reducers/blogReducer'
import { setUserFromToken } from './reducers/userReducer'
//Services
import blogService from './services/blogs'
import userService from './services/users'

const App = (props) => {

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  useEffect(() => {
    console.log('effect tapahtuu')
    if (loggedUserJSON) {
      console.log('if tapahtuu')
      const user = JSON.parse(loggedUserJSON)
      props.setUserFromToken(user)
      blogService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    props.initializeBlogs()
  }, [])


  return (
    < div >
      <Notification />
      {!props.user ?
        <LoginForm />
        :
        <div>
          <UserInfo />
          <Blogs />
          <BlogForm />
        </div>
      }
      <Footer />


    </div >
  )
}

const dispatchToProps = {
  initializeBlogs,
  setUserFromToken

}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(App)