import React from 'react'

const Message = ({messageStatus, message}) => {



  if(messageStatus && message)
  return (
    <div className="success">
      {message}
    </div>
  )
  else if(!messageStatus && message) 
  return (
    <div className="error">
      {message}
    </div>
  )
  return (null)
}

export default Message