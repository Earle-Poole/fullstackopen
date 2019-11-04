import React, { useEffect } from "react"
import { connect } from 'react-redux'
import ConnectedAnecdoteList from './components/AnecdoteList'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedNotification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = props => {
  useEffect(() => {
    async function getAnecdotes() {
      const anecdotes = await anecdoteService.getAll()
      props.initializeAnecdotes(anecdotes)
    }
    getAnecdotes()
  }, [props])

  return (
    <div>
      <ConnectedNotification />
      <ConnectedAnecdoteForm />
      <ConnectedAnecdoteList />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
