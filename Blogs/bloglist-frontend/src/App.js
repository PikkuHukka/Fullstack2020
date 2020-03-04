
import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { setUserFromToken } from './reducers/userReducer'
import blogService from './services/blogs'

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

  console.log(props.user)
  console.log(loggedUserJSON)


  return (
    < div >
      {!props.user ?
        <LoginForm />
        : <Blogs />
      }
    </div >
  )
}

//export default connect(null, { initializeBlogs })(App)

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