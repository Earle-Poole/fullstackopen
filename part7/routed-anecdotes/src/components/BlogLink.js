//React imports
import React from 'react'
import { Link } from 'react-router-dom'

const BlogLink = props => {
  return (
    <div>
      <Link to={`/blogs/${props.user.id}`}>{props.user.content}</Link>
    </div>
  )
}

export default BlogLink
