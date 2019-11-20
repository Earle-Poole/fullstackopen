// React imports
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// Reducers
import { newBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
// Tools
import { generateID } from '../utils/tools'


const NewBlogFormNoHistory = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const blog = {
      blogContent: e.target.blogContent.value,
      author: e.target.author.value,
      id: generateID(),
    }
    props.setNotification(`new blog "${blog.content}" by ${blog.author}`, 10)
    props.newBlog(blog)
    props.history.push('/')
  }

  const newBlogStyling = {
    paddingBottom: '20px',
    width: '400px',
  }

  return (
    <div style={newBlogStyling}>
      <h4>create a new blog</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text">blog content</span>
          </div>
          <input name="blogContent" className="form-control" />
        </div>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text">author</span>
          </div>
          <input name="author" className="form-control" />
        </div>
        <button className="btn btn-outline-primary" type="submit">create</button>
      </form>
    </div>
  )
}

const NewBlogForm = withRouter(NewBlogFormNoHistory)
const mapDispatchToProps = {
  newBlog,
  setNotification,
}

const ConnectedNewBlogForm = connect(null, mapDispatchToProps)(NewBlogForm)

export default ConnectedNewBlogForm
