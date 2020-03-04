const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  console.log('*** päästiin postiin.')
  if (body.password === undefined || body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)


  console.log('bcrypt toimi: ', passwordHash)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  console.log('SavedUser: ', savedUser)
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter
