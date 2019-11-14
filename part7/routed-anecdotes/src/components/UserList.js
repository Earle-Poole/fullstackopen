//React imports
import React from 'react'
import { connect } from 'react-redux'

const UserList = props => {
  const { blogs } = props

  const usersBlogsCountTable = blogs.map(blog => {
    return (
      <tr key={blog.id}>
        <td>{blog.author}</td>
        <td>{blog.blogsList.length}</td>
      </tr>
    )
  })

  return (
    <div>
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
  return {
    blogs: state.blogs
  }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList