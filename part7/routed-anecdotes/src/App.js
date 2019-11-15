//React imports
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
//Disconnected components
import About from './components/About'
import Footer from './components/Footer'
//Reducers
import { initializeBlogs } from './reducers/blogReducer'
//Connected components
import ConnectedBlogList from './components/BlogList'
import ConnectedBlog from './components/Blog'
import ConnectedLogin from './components/Login'
import ConnectedMenu from './components/Menu'
import ConnectedNewBlogFormfrom from './components/NewBlogForm'
import ConnectedNotification from './components/Notification'
import ConnectedUserList from './components/UserList'
import ConnectedUser from './components/User'

const App = props => {
  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  return (
    <div>
      <Router>
        <ConnectedMenu />
        <ConnectedNotification />
        <Route exact path="/" render={() =>
          <ConnectedBlogList />
        } />
        <Route path="/blogs/:id" render={({match}) => 
          <ConnectedBlog blogID={+match.params.id} />
        } />
        <Route exact path="/about" render={() => 
          <About />
        } />
        <Route exact path="/create" render={() => 
          <ConnectedNewBlogFormfrom />
        } />
        <Route exact path="/users" render={() =>
          <ConnectedUserList />
        } />
        <Route path="/users/:id" render={({ match }) => 
          <ConnectedUser userID={+match.params.id} />
        } />
        <Route exact path="/login" component={ConnectedLogin} />
        <Footer />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  console.log("state", state)
  return {
    userToLogout: state.loggedUser
  }
}

export default connect(mapStateToProps, { initializeBlogs })(App)