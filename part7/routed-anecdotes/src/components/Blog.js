import React from 'react'

const Blog = props => {
  console.log("props", props)
  return (
    <div>
      <span>{props.user.content}</span>
    </div>
  )
}

export default Blog
