//React imports
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//Reducers
import { newBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
//Tools
import { generateID } from '../utils/tools'


const NewBlogFormNoHistory = (props) => {
  const handleSubmit = async e => {
    e.preventDefault()
    const blog = { 
      blogContent: e.target.blogContent.value,
      author: e.target.author.value,
      id: generateID()
    }
    props.setNotification(`new blog "${blog.content}" by ${blog.author}`, 10)
    props.newBlog(blog)
    props.history.push('/')
  }

  const newBlogPadding = {
    paddingBottom: '20px'
  }

  return (
    <div style={newBlogPadding}>
      <h2>create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          blog content
          <input name='blogContent' />
        </div>
        <div>
          author
          <input name='author' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const NewBlogForm = withRouter(NewBlogFormNoHistory)
const mapDispatchToProps = {
  newBlog,
  setNotification
}

const ConnectedNewBlogForm = connect(null, mapDispatchToProps)(NewBlogForm)

export default ConnectedNewBlogForm
