const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
//http request logger middleware
const morgan = require('morgan')
const mongoose = require('mongoose')
const { errorHandler, unknownEndpoint } = require('./utils/middleware')

let devMode = 'Work'
let url

if (devMode === 'Work')
  console.log('connecting to', config.MONGODB_URI_HOME)
else if (devMode === 'Home')
  console.log('connecting to', config.MONGODB_URI_WORK)

mongoose.set('useFindAndModify', false)

if (devMode === 'Home'){
  url = config.MONGODB_URI_HOME
}
else if (devMode === 'Work') {
  url = config.MONGODB_URI_WORK
}

mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connected to  MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('reqBody', function (req, res) {
  // console.log('req.body :', req.body);
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

app.use('/api/persons', personsRouter)

app.use(errorHandler)
app.use(unknownEndpoint)
