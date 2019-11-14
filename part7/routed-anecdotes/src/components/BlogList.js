//React imports
import React from 'react'
import { connect } from 'react-redux'
//Reducers
import { setNotification } from '../reducers/notificationReducer'
//Disconnected components
import Blog from './Blog'

const BlogList = props => { 
  const users = props.blogs
  const fullBlogList = []

  users.map(user => user.blogsList.map(blog => fullBlogList.push(blog)))

  const blogListPadding = {
    paddingBottom: 15
  }

  return (
    <div style={blogListPadding}>
      {fullBlogList.map(user => {
        return (
          <Blog content={user.content} key={user.id} />
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return { 
    blogs: state.blogs,
  }
}

const mapDispatchToProps = { 
  // voteBlog,
  setNotification
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList
