//React imports
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
//Reducers
import { logoutUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'


const Menu = props => {
  const linkPadding = {
    paddingRight: 5
  }
  const menuPadding = {
    paddingBottom: 15
  }
  const logoutCurrentUser = () => {
    props.logoutUser()
    props.setNotification('you have been logged out', 5)
  }
  console.log("props.loggedUser", props.loggedUser)
  return (
    <div style={menuPadding}>
      <h1>blogs</h1>
      {
        Object.keys(props.loggedUser).length === 1 ?
          <div style={menuPadding}>logged in as {props.loggedUser.username}</div> :
          null
      }
      <Link to="/" style={linkPadding}>blogs</Link>
      <Link to="/users" style={linkPadding}>users</Link>
      <Link to="/create" style={linkPadding}>create blog</Link>
      <Link to="/about" style={linkPadding}>about</Link>
      {
        Object.keys(props.loggedUser).length === 0 ? 
          <Link to="/login" style={linkPadding}>login</Link> :
          <Link to="/" style={linkPadding} onClick={logoutCurrentUser}>logout</Link>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = { logoutUser, setNotification }

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default ConnectedMenu
