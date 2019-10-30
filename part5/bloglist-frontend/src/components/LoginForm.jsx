import React from "react"
import PropTypes from "prop-types"
import { useField } from "../hooks"

const LoginForm = ({
  handleLogin,
}) => {
  const resetScrubber = (field) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = field
    return noReset
  }
  const usernameField = useField("text", "Username")
  const passwordField = useField("password", "Password")

  return (
    <form
      onSubmit={e => {
        handleLogin(e, usernameField, passwordField)
        usernameField.reset()
        passwordField.reset()
      }}>
      <div>
        username
        <input {...resetScrubber(usernameField)} />
      </div>
      <div>
        password
        <input {...resetScrubber(passwordField)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  // setUsername: PropTypes.func.isRequired,
  // setPassword: PropTypes.func.isRequired,
}

export default LoginForm
