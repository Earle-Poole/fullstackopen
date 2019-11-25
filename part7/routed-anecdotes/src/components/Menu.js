// React imports
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Reducers
import { logoutUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'


const Menu = (props) => {
  const { loggedUser } = props

  const linkPadding = {
    paddingRight: 5,
  }
  const menuProperties = {
    paddingBottom: 15,
  }
  const logoutCurrentUser = () => {
    props.logoutUser()
    props.setNotification('you have been logged out', 5)
  }

  return (
    <div style={menuProperties} className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h1 className="my-0 mr-md-auto font-weight-normal">blogs</h1>
      {
        Object.keys(loggedUser).length === 1
          ? (
            <div style={menuProperties}>
              {'logged in as'}
              {loggedUser.username}
            </div>
          )
          : null
      }
      <nav className="my-2 my-md-0 mr-md-3">
        <Link to="/" style={linkPadding} className="p-2 text-dark">blogs</Link>
        <Link to="/users" style={linkPadding} className="p-2 text-dark">users</Link>
        <Link to="/create" style={linkPadding} className="p-2 text-dark">create blog</Link>
        <Link to="/about" style={linkPadding} className="p-2 text-dark">about</Link>
        {
          Object.keys(loggedUser).length === 0
            ? <Link to="/login" style={linkPadding} className="p-2 btn btn-outline-primary">login</Link>
            : <Link to="/" style={linkPadding} onClick={logoutCurrentUser} className="p-2 btn btn-outline-primary">logout</Link>
        }
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedUser: state.loggedUser,
})

const mapDispatchToProps = { logoutUser, setNotification }

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default ConnectedMenu
