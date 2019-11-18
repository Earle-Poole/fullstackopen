//React imports
import React from "react"
import { connect } from "react-redux"
//Reducers
import { voteBlog } from "../reducers/blogReducer"

const Blog = props => {
  const blogPadding = {
    paddingBottom: 15,
  }

  const selectedBlog = props.blogsByUser
    .map(user => {
      return user.blogsList.find(blog => {
        return blog.id === props.blogID
      })
    })
    .filter(user => {
      if (user === undefined) {
        return false
      }
      return true
    })[0]

  let selectedUserName
  if (selectedBlog) {
    selectedUserName =
      props.blogsByUser[
        props.blogsByUser.findIndex(user => {
          return user.id === selectedBlog.userID
        })
      ].username
  }

  console.log("selectedBlog", selectedBlog)

  const handleVoteSubmit = e => {
    e.preventDefault()
    const IDObj = { userID: selectedBlog.userID, blogID: selectedBlog.id }

    props.voteBlog(IDObj)
  }

  return (
    <div style={blogPadding}>
      <h2>"{selectedBlog.content}" by {selectedUserName}</h2>
      <form onSubmit={handleVoteSubmit}>
        <div>
          {selectedBlog.votes} likes
          <button>likes</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogsByUser: state.blogsByUser,
  }
}

const mapDispatchToProps = {
  voteBlog,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
