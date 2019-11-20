/* eslint-disable no-restricted-syntax */
// React imports
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// Reducers
import { voteBlog, commentOnBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [comments, setComments] = useState([])

  const blogPadding = {
    paddingBottom: 15,
  }

  const { blogsByUser, blogID } = props

  const selectedBlog = blogsByUser
    .map((user) => {
      for (const blog of Object.keys(user.blogsList)) {
        if (user.blogsList[blog].id === blogID) {
          return user.blogsList[blog]
        }
      }
      return null
    })
    .filter((user) => {
      if (user === undefined) {
        return false
      }
      return true
    })[0]

  useEffect(() => {
    const initComments = []
    for (let i = 0; i < Object.keys(selectedBlog.comments).length; i += 1) {
      initComments.push(selectedBlog.comments[i])
    }
    setComments(initComments)
  }, [selectedBlog.comments])

  let selectedUserName

  if (selectedBlog) {
    selectedUserName = blogsByUser[
      props.blogsByUser.findIndex((user) => user.id === selectedBlog.userID)
    ].username
  }

  const handleVoteSubmit = (e) => {
    e.preventDefault()
    const IDObj = { userID: selectedBlog.userID, blogID: selectedBlog.id }

    props.voteBlog(IDObj)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    const comment = e.target.comment.value
    setComments([...comments, comment])
    e.target.comment.value = ''
    props.commentOnBlog(selectedBlog.id, comment, props.blogsByUser)
  }

  return (
    <div style={blogPadding}>
      <h4>{`"${selectedBlog.content}" by ${selectedUserName}`}</h4>
      <form onSubmit={handleVoteSubmit} className="pl-3 text-muted">
        {`${selectedBlog.votes} likes`}
        <button className="ml-3 btn btn-outline-primary" type="submit">like</button>
      </form>
      <hr />
      <h5>comments</h5>
      <form onSubmit={handleCommentSubmit} className="mx-3">
        <div className="input-group mb-2 mx-auto" style={{ width: 'fit-content' }}>
          <input name="comment" />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="submit">add comment</button>
          </div>
        </div>
        <ul className="list-group list-group-flush row no-gutters">
          {comments.map((comment) => <li key={comment} className="list-group-item col-12">{comment}</li>)}
        </ul>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogsByUser: state.blogsByUser,
})

const mapDispatchToProps = {
  voteBlog,
  commentOnBlog,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
