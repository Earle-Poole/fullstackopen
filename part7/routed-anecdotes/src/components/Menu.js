//React imports
import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const linkPadding = {
    paddingRight: 5
  }
  const menuPadding = {
    paddingBottom: 15
  }
  return (
    <div style={menuPadding}>
      <h1>blogs</h1>
      <Link to="/" style={linkPadding}>blogs</Link>
      <Link to="/users" style={linkPadding}>users</Link>
      <Link to="/create" style={linkPadding}>create new</Link>
      <Link to="/about"style={linkPadding}>about</Link>
    </div>
  )
}

export default Menu
