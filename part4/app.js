/* eslint-disable no-unused-vars */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

const devMode = 'Work'
let url

mongoose.set('useFindAndModify', false)

if (devMode === 'Work') {
  url = config.MONGODB_URI_WORK
} else if (devMode === 'Home') {
  url = config.MONGODB_URI_HOME
}

logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    logger.info('connected to  MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
