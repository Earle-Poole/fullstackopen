//React imports
import React from 'react'
import { connect } from 'react-redux'

const Blog = props => {
  const blogPadding = {
    paddingBottom: 15
  }

  const selectedBlog = props.blogsByUser.map(user => {
    return user.blogsList.find(blog => {
      return blog.id === props.blogID
    })
  }).filter(user => {
    if(user === undefined){
      return false
    }
    return true
  })

  let selectedUserName
  if(selectedBlog[0]){
    selectedUserName = props.blogsByUser[props.blogsByUser.findIndex(user => {
      return user.id === selectedBlog[0].userID
    })].username
  }
  
  return (
    <div style={blogPadding}>
      <h2>{selectedUserName}</h2>
      ThIs sHoulD be thE DetaiLs oF ONe bloG
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogsByUser: state.blogsByUser
  }
}

const ConnectedBlog = connect(mapStateToProps)(Blog)

export default ConnectedBlog
