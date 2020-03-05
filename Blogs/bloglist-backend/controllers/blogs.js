const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.get('/testi', (request, response) => {
  response.send('<h1>Hello Testi!</h1>')
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes === undefined ? 0 : body.likes,
    url: body.url,
    comments: [],
    user: user._id
  })


  const savedBlog = await blog.save()



  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const palautettavaBlog = await Blog.findById(savedBlog.id)
    .populate('user', { username: 1, name: 1 })

  response.json(palautettavaBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const foundBlog = await Blog.findById(request.params.id)
  console.log(foundBlog)
  console.log(user)
  if (foundBlog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'incorrect token'
    })
  }

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes === undefined ? 0 : body.likes,
    url: body.url,
    comments: body.comments,
    date: new Date()
  }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(200).end()
})


module.exports = blogsRouter