const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id.toBeDefined)

})

test('a valid blog can be added2 ', async () => {
  const user = await User.findOne({ username: process.env.TESTERACCOUNT })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TESTERPASSWORD, user.passwordHash)

  if ((user && passwordCorrect)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)


    const newBlog = {
      author: 'pikkuhukka',
      title: 'How do I get likes?',
      url: 'www.testausOnHassua.fi'
    }


    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length - 1].title).toBe('How do I get likes?')
    expect(response.body[response.body.length - 1].likes).toBe(0)
  }
})



test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the first blog is about hassutin', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Kuinka Olla Hassutin')
})

test('a valid blog can be added ', async () => {


  const user = await User.findOne({ username: process.env.TESTERACCOUNT })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TESTERPASSWORD, user.passwordHash)

  if ((user && passwordCorrect)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)



    const newBlog = {
      author: 'testaajaJabaSiis',
      title: 'async/await simplifies making async calls',
      likes: 5,
      url: 'www.testausOnHassua.fi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)


    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  }

})


test('blog without title or url is not added', async () => {

  const user = await User.findOne({ username: process.env.TESTERACCOUNT })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TESTERPASSWORD, user.passwordHash)

  if ((user && passwordCorrect)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      author: 'testaajaJabaSiis',
      likes: 5,
      url: 'www.testausOnHassua.fi'
    }

    const newBlog2 = {
      author: 'testaajaJabaSiis',
      likes: 4,
      title: 'testauksen taito'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)

    expect(response.body.length).toBe(helper.initialBlogs.length)

  }
})
test('blog without token cant be added.', async () => {

  const newBlog = {
    author: process.env.TESTACCOUNT,
    title: 'How do I get likes?',
    url: 'www.testausOnHassua.fi'
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)



})



afterAll(() => {
  mongoose.connection.close()
})

