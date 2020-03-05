import blogService from '../services/blogs'



const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        likes: anecdoteToChange.likes + 1
      }
      state.sort(function (a, b) {
        if (b.id === id) {
          return (b.likes + 1) - a.likes
        } else if (a.id === id) {
          return b.likes - (a.likes + 1)
        } else
          return b.likes - a.likes
      })
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )

    case 'REMOVE_BLOG':
      const removeId = action.data.id
      const newBlogs = state.filter(b => {
        return b.id !== removeId;
      });
      return newBlogs

    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = (content, user) => {
  console.log(content)
  console.log(user)

  return async dispatch => {
    const newBlog = await blogService.create(content)
    console.log(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const newLike = (id) => {
  return async dispatch => {
    await blogService.likeBlog(id)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}
export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer