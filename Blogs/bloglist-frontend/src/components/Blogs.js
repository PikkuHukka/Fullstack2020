import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { newLike } from '../reducers/blogReducer'
import { clearUser } from '../reducers/userReducer'


import Blog from './Blog'



const Blogs = (props) => {



  const likeHandler = async (id) => {
    console.log(id)
    props.newLike(id)
  }
  const removeHandler = async (id) => {

    if (!window.confirm("Do you really want to remove this blog?")) {
      return
    }
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
            <Blog newID={index}
              blog={blog}
              handleLike={() =>
                likeHandler(blog.id, blog)}
              handleRemove={() =>
                removeHandler(blog.id)}
              user={props.user}
            />
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
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Blogs)
