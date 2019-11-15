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
  const logUserOut = () => {
    props.logoutUser()
    props.setNotification('you have been logged out', 5)
  }
  return (
    <div style={menuPadding}>
      <h1>blogs</h1>
      <Link to="/" style={linkPadding}>blogs</Link>
      <Link to="/users" style={linkPadding}>users</Link>
      <Link to="/create" style={linkPadding}>create new</Link>
      <Link to="/about" style={linkPadding}>about</Link>
      {
        Object.keys(props.loggedUser).length === 0 ? 
          <Link to="/login" style={linkPadding}>login</Link> :
          <Link to="/" style={linkPadding} onClick={logUserOut}>logout</Link>
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
