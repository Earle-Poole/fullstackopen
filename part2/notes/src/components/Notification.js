import React from 'react'

const Notification = ({message, successMessage}) => {
  if(message === null && !successMessage) {
    return null
  }

  if(!successMessage) return (
    <div className="error">
      {message}
    </div>
  )

  if(successMessage) return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notification