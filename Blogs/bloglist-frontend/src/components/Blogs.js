import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { newLike } from '../reducers/blogReducer'
import { clearUser } from '../reducers/userReducer'


import Blog from './Blog'



const Blogs = (props) => {



  const clickHandler = async (props, id, content) => {
    console.log(id)
    props.newLike(id)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    props.clearUser()
  }


  return (
    <div>
      <button onClick={handleLogout}>Logout </button>
      <ul>
        {props.visibleBlogs.map((blog, index) =>
          <div key={index}>
            <Blog newID={index} blog={blog} handleClick={() =>
              clickHandler(props, blog.id, blog)
            } />
          </div>
        )}
      </ul>
    </div >

  )
}


const blogsToShow = ({ blogs }) => {
  return blogs

}


const dispatchToProps = {
  newLike,
  clearUser
}
const mapStateToProps = (state) => {
  return {
    visibleBlogs: blogsToShow(state),
    setUser: state.user
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Blogs)
