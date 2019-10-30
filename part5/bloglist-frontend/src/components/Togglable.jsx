import React, { useState } from "react"
import PropTypes from "prop-types"

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type='submit' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button type='submit' onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
}

export default Togglable
