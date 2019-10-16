const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'A Journey in New Shoes: Reebok',
    author: 'J P Hudson',
    url: 'www.google.com',
    likes: 12691,
  }, {
    title: 'A Journey in New Shoes: ADIDAS',
    author: 'J P Hudson',
    url: 'www.google.com',
    likes: 61321,
  }, {
    title: 'A Journey in New Shoes: Nike',
    author: 'J P Hudson',
    url: 'www.google.com',
    likes: 8523,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('persons are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('the first blog is about A Journey in New Shoes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('A Journey in New Shoes: Reebok')
})

afterAll(() => {
  mongoose.connection.close()
})
