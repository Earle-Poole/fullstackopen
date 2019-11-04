import React from 'react'
import { addedAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import ConnectedFilter from './Filter'

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault()
    const content = {
      content: e.target.anecdote.value,
      votes: 0,
    }
    e.target.anecdote.value = ''

    props.addedAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <ConnectedFilter />
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addedAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
