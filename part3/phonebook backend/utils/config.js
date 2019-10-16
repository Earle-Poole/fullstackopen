/* eslint-disable no-undef */
require('dotenv').config()
let PORT = process.env.PORT
let MONGODB_URI_HOME = process.env.MONGODB_URI_HOME
let MONGODB_URI_WORK = process.env.MONGODB_URI_WORK

module.exports = {
  MONGODB_URI_HOME,
  MONGODB_URI_WORK,
  PORT
}