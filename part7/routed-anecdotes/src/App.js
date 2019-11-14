//React imports
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
//Disconnected components
import About from './components/About'
import Footer from './components/Footer'
import Menu from './components/Menu'
//Reducers
import { initializeBlogs } from './reducers/blogReducer'
//Connected components
import ConnectedBlogList from './components/BlogList'
import ConnectedNewBlogFormfrom from './components/NewBlogForm'
import ConnectedNotification from './components/Notification'
import ConnectedUserList from './components/UserList'

const App = props => {
  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  return (
    <div>
      <Router>
        <Menu />
        <ConnectedNotification />
        <Route exact path="/" render={() =>
          <ConnectedBlogList />
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
        <Footer />
      </Router>
    </div>
  )
}

export default connect(null, { initializeBlogs })(App)