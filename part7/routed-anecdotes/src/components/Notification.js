import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const { style, message } = props

  return (
    <div style={style} className="alert alert-secondary" role="alert">
      {message}
    </div>
  )
}

const mapStateToProps = (state) => ({
  style: state.notification.style,
  message: state.notification.message,
})

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
