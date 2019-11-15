//React imports
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//Reducers
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginNoHistory = props => {
  const handleSubmit = async e => {
    e.preventDefault()
    const username = e.target.username.value

    props.setNotification(`user ${e.target.username.value} logged in`, 10)
    props.loginUser(username)
    props.history.push('/')
  }

  const loginPadding = {
    paddingBottom: '20px'
  }
  
  return (
    <div style={loginPadding}>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input name='username' />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

const Login = withRouter(LoginNoHistory)

const mapStateToProps = state =>{
  return { users: state.loggedUser }
}

const mapDispatchToProps = { loginUser, setNotification }

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin