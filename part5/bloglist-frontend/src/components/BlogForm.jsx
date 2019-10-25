/* eslint-disable react/jsx-one-expression-per-line */
import React from "react"
import Message from "./Message"

const BlogForm = ({ children, handleLogout, messageStatus, message, user }) => (
  <div>
    <form onSubmit={handleLogout}>
      <Message messageStatus={messageStatus} message={message} />
      <span>{user.name} logged in</span>
      <button type='submit'>logout</button>
    </form>
    {children}
  </div>
)

export default BlogForm
