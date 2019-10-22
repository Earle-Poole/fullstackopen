const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have the "title" and "url" properties', async () => {
    const initialBlogs = await helper.blogsInDb()
    const titles = []
    const urls = []


    initialBlogs.map((like) => {
      titles.push(like.title)
      urls.push(like.url)
      return null
    })

    expect(titles).not.toContain(undefined)
    expect(urls).not.toContain(undefined)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('the first blog is about A Journey in New Shoes', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)

    expect(contents).toContain('A Journey in New Shoes: Reebok')
  })

  describe('viewing a specific note', () => {
    test('blogs have the unique "id" property', async () => {
      const initialBlogs = await helper.blogsInDb()

      const ids = initialBlogs.filter((id) => {
        if (id.id === undefined) {
          return false
        }
        return true
      }).map((id) => id)

      expect(ids.length).toBe(initialBlogs.length)
    })

    test('blogs have the "likes" property', async () => {
      const initialBlogs = await helper.blogsInDb()

      const likes = initialBlogs.map((likeCount) => {
        if (likeCount.likes === undefined) {
          return { likes: 0 }
        }
        return { likes: likeCount.likes }
      })

      expect(likes).toStrictEqual([{ likes: 12691 }, { likes: 61321 }, { likes: 8523 }])
    })
  })
  
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const startingBlogs = await helper.blogsInDb()
      const blogToDelete = startingBlogs[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('addition of a new note', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Smitten by Mittens',
        author: 'Horace Hanksly',
        url: 'www.google.com',
        likes: 14,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).toContain('Smitten by Mittens')
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Horace Hanksly',
        url: 'www.google.com',
        likes: '462',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('if id matches existing blog, edit existing one', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const generateNum = () => Math.floor(Math.random() * 100000)

      const modifiedBlog = { ...blogsAtStart[0], likes: generateNum() }

      await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send(modifiedBlog)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtStart[0].likes).not.toBe(blogsAtEnd[0].likes)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
