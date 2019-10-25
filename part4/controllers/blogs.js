/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate({ path: 'userid', model: 'User' })

    res.json(blogs.map((blog) => blog.toJSON()))
  } catch (err) { next(err) }
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
      res.json(blog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (err) { next(err) }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ err: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      userid: decodedToken.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    if (blog.title === undefined || blog.url === undefined) {
      res.status(400).json({ err: 'failure' })
    } else {
      const result = await blog.save()

      res.status(200).json(result)
    }
  } catch (err) { next(err) }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ err: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)

    if (decodedToken.id.toString() !== blog.userid.toString()) {
      return res.status(401).json({ err: 'token does not match user' })
    }

    await Blog.findByIdAndRemove(id)
    res.status(204).end()
  } catch (err) { next(err) }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      userid: body.userid,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

    res.status(201).json(updatedBlog)
  } catch (err) { next(err) }
})

module.exports = blogsRouter
