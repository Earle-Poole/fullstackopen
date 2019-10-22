const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingId = async () => {
  const blog = new Blog({ author: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,
}
