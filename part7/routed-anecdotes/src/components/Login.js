// React imports
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// Reducers
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginNoHistory = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target.username.value

    props.setNotification('successfully logged in', 5)
    props.loginUser(username)
    props.history.push('/')
  }

  const loginPadding = {
    paddingBottom: '20px',
    width: '400px',
  }

  return (
    <div style={loginPadding}>
      <h4>login</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text">username</span>
          </div>
          <input name="username" className="form-control" />
        </div>
        <button className="btn btn-outline-primary" type="submit">login</button>
      </form>
    </div>
  )
}

const Login = withRouter(LoginNoHistory)

const mapStateToProps = (state) => ({ users: state.loggedUser })

const mapDispatchToProps = { loginUser, setNotification }

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
