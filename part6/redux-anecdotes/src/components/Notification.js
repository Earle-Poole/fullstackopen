import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const { style, message } = props

  return (
    <div style={style}>
      you voted {message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    style: state.notification.style,
    message: state.notification.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
