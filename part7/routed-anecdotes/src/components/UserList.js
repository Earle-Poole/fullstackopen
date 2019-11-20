// React imports
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  const { blogs } = props

  const userListStyling = {
    paddingBottom: '20px',
    width: '400px',
  }

  const usersBlogsCountTable = blogs.map((blog) => (
    <tr key={blog.id}>
      <td><Link to={`/users/${blog.id}`}><h5>{blog.username}</h5></Link></td>
      <td><h5>{Object.values(blog.blogsList).length}</h5></td>
    </tr>
  ))

  return (
    <div style={userListStyling} className="list-group">
      <table>
        <tbody>
          <tr>
            <th aria-label="blog count table" />
            <th><h4>blogs created</h4></th>
          </tr>
          {usersBlogsCountTable}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogsByUser,
})

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList
