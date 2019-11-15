//React imports
import React from 'react'
import { connect } from 'react-redux'

const User = props => {
  const selectedUser = props.blogsByUser.find(user => {
    return user.id === props.userID
  })

  const userPadding = {
    paddingBottom: 15
  }

  if(selectedUser){
    console.log("selectedUser", selectedUser)
    let { username, blogsList } = selectedUser

    return (
      <div style={userPadding}>
        <h2>{username}</h2>
        {blogsList.map(blog => {
          console.log("blog", blog)
          return (
            <div key={blog.id}>
              {blog.content}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={userPadding}>
      could not find the user you are looking for
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.loggedUser,
    blogsByUser: state.blogsByUser
  }
}

const ConnectedUser = connect(mapStateToProps)(User)

export default ConnectedUser