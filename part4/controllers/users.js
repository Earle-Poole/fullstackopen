const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    if (body.password.length >= 3 && body.username.length >= 3) {
      const salt = 10
      const passwordHash = await bcrypt.hash(body.password, salt)

      const user = new User({
        username: body.username,
        name: body.name,
        blogs: body.blogs,
        passwordHash,
      })

      const savedUser = await user.save()

      res.json(savedUser)
    } else res.status(411).send({ error: 'username and password must be 3 characters or more' })
  } catch (err) {
    next(err)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate({ path: 'blogs', model: 'Blog' })
    res.json(users.map((u) => u.toJSON()))
  } catch (err) {
    next(err)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    res.json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter
