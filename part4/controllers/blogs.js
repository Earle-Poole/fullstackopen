const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// blogsRouter.get('/', ( req, res ) => {
//   res.json({lol: "Hey!"})
// })

blogsRouter.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then((blogs) => {
      res.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)
  console.log('blog', blog)

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((err) => console.log('err', err))
})

module.exports = blogsRouter
