import React from "react"

const Message = ({ messageStatus, message }) => {
  if (message) {
    return <div className={messageStatus ? "success" : "error"}>{message}</div>
  }
  return null
}

export default Message
