//React imports
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const UserList = props => {
  const { blogs } = props

  const userListPadding = {
    paddingBottom: "20px",
  }

  const usersBlogsCountTable = blogs.map(blog => {
    return (
      <tr key={blog.id}>
        <td><Link to={`/users/${blog.id}`}>{blog.username}</Link></td>
        <td>{blog.blogsList.length}</td>
      </tr>
    )
  })

  return (
    <div style={userListPadding}>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {usersBlogsCountTable}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  console.log("state in UserList", state)
  return {
    blogs: state.blogsByUser,
  }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList
