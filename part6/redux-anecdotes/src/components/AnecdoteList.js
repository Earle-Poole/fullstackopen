import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = ( id, content ) => {
    props.voteAnecdote(id)
    props.displayNotification(content)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
  <div>
    <h2>Anecdotes</h2>
    {
      props.filter.length === 0 ?
        props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )) :
        props.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().indexOf(props.filter) > -1)
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))
    }
  </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter.string
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  displayNotification,
  hideNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
