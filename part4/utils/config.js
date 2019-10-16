require('dotenv').config()

const { PORT } = process.env
let { MONGODB_URI_HOME, MONGODB_URI_WORK } = process.env

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI_HOME = process.env.TEST_MONGODB_URI_HOME
  MONGODB_URI_WORK = process.env.TEST_MONGODB_URI_WORK
}

module.exports = {
  MONGODB_URI_HOME,
  MONGODB_URI_WORK,
  PORT,
}
