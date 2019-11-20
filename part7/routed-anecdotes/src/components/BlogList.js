/* eslint-disable no-restricted-syntax */
// React imports
import React from 'react'
import { connect } from 'react-redux'
// Reducers
import { setNotification } from '../reducers/notificationReducer'
// Disconnected components
import BlogLink from './BlogLink'

const BlogList = (props) => {
  const { blogsByUser } = props
  const users = blogsByUser
  const fullBlogList = []

  users.map((user) => {
    for (const blog of Object.keys(user.blogsList)) {
      fullBlogList.push(user.blogsList[blog])
    }
    return null
  })

  const blogListPadding = {
    paddingBottom: 15,
  }

  return (
    <div style={blogListPadding} className="list-group">
      {fullBlogList.map((user) => <BlogLink user={user} key={user.id} />)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogsByUser: state.blogsByUser,
})

const mapDispatchToProps = {
  // voteBlog,
  setNotification,
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList
