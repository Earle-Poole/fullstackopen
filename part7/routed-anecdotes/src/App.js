// React imports
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// Disconnected components
import About from './components/About'
import Footer from './components/Footer'
// Reducers
import { initializeBlogs } from './reducers/blogReducer'
// Connected components
import ConnectedBlogList from './components/BlogList'
import ConnectedBlog from './components/Blog'
import ConnectedLogin from './components/Login'
import ConnectedMenu from './components/Menu'
import ConnectedNewBlogForm from './components/NewBlogForm'
import ConnectedNotification from './components/Notification'
import ConnectedUserList from './components/UserList'
import ConnectedUser from './components/User'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  return (
    <div className="container">
      <Router>
        <ConnectedMenu />
        <ConnectedNotification />
        <Route exact path="/" component={ConnectedBlogList} />
        <Route path="/blogs/:id" render={({ match }) => <ConnectedBlog blogID={+match.params.id} />} />
        <Route exact path="/about" component={About} />
        <Route exact path="/create" component={ConnectedNewBlogForm} />
        <Route exact path="/users" component={ConnectedUserList} />
        <Route path="/users/:id" render={({ match }) => <ConnectedUser userID={+match.params.id} />} />
        <Route exact path="/login" component={ConnectedLogin} />
        <Footer />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userToLogout: state.loggedUser,
})

export default connect(mapStateToProps, { initializeBlogs })(App)
