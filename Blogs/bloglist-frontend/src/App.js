
import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

//Components
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Header from './components/Header'
import Blog from './components/Blog'


//Reducers
import { setLoginFromToken } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

//Services
import blogService from './services/blogs'

const App = (props) => {

  const loggedLoginJSON = window.localStorage.getItem('loggedBlogappLogin')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
    if (loggedLoginJSON) {
      const login = JSON.parse(loggedLoginJSON)
      props.setLoginFromToken(login)
      blogService.setToken(login.token)
    }
  }, [])


  return (
    <div class="container">
      <Router>
        <Notification />

        {!props.login ?
          <div >
            <LoginForm />
          </div >
          :
          < div >
            <Header />
            <Switch>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/blogs/:id">
                <Blog />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/blogs">
                <Blogs />
                <BlogForm />
              </Route>
            </Switch>

          </div>
        }
        <Footer />
      </Router>
    </div>
  )
}

const dispatchToProps = {
  setLoginFromToken,
  initializeUsers,
  initializeBlogs
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(App)