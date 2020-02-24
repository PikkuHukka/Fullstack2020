const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'Ilona',
    title: 'Kuinka Olla Hassutin',
    likes: 15,
    url: 'hassublogi.fi'
  },
  {
    author: 'Akseli',
    title: 'Akselin hupsublogi',
    likes: 5,
    url: 'hupsublogi.fi'
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}