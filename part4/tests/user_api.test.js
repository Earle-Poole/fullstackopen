const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'root',
      password: 'issasekret',
    })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Earle123',
      name: 'Earle',
      password: '123abc',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Earle123',
      name: 'Earle',
      password: '123abc',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password are too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Ea',
      name: 'Earle',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(411)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be 3 characters or more')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})
