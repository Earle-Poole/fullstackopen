// React imports
import React from 'react'
import { Link } from 'react-router-dom'

const BlogLink = (props) => {
  const { user } = props

  return (
    <div className="list-group-item">
      <Link to={`/blogs/${user.id}`}>{user.content}</Link>
    </div>
  )
}

export default BlogLink
