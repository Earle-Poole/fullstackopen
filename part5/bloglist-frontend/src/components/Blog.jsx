/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react"
import blogsService from "../services/blogs"

const Blog = ({
  blog,
  user,
  getBlogs,
  loggedUser,
  deleteBlog,
  incrementLikes,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const showWhenExpanded = { display: isExpanded ? "" : "none" }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleIncrementLikes = async () => {
    await incrementLikes(blog)

    getBlogs()
  }

  const handleDeleteBlog = async () => {
    const confirm = window.confirm(
      `deleting blog ${blog.title} by ${blog.author}. are you sure?`
    )

    if (confirm) {
      blogsService.setToken(user.token)
      await deleteBlog(blog)
      getBlogs()
    }
  }

  const loggedUserMatch = {
    display: JSON.parse(loggedUser).name === blog.userid.name ? "" : "none",
  }

  return (
    <div className='blog'>
      <span
        onClick={toggleExpanded}
        onKeyPress={null}
        role='button'
        tabIndex='0'>
        {blog.title} {blog.author}
      </span>
      <div style={showWhenExpanded}>
        <a href={`http://${blog.url}`}>{blog.url}</a>
        <br />
        {blog.likes}
        <button type='button' onClick={handleIncrementLikes}>
          likes
        </button>
        <br />
        added by {blog.userid.name}
        <br />
        <button
          style={loggedUserMatch}
          type='button'
          onClick={handleDeleteBlog}>
          delete
        </button>
      </div>
    </div>
  )
}

export default Blog
