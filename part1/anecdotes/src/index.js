import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdotes = ({ selected }) => {
  let anecdoteArrOfObjs = []
  for(let i = 0; i < anecdotes.length; i++){
    anecdoteArrOfObjs[i] = {
      text: anecdotes[i],
      votes: 0,
    }
  }

  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

const Votes = ({ votes, selected }) => {
  return (
    <div>
      has {votes[selected]} votes
    </div>
  )
}

const incrementVote = (selected, votes, setVotes) => {
  const copy = {...votes}
  copy[selected] += 1
  setVotes(copy)
}

const randomNum = () => Math.floor(Math.random() * anecdotes.length)

const initialVotesState = () => {
  const initVoteObj = {}
  for(let i = 0; i < anecdotes.length; i++) {
    initVoteObj[i] = 0
  }
  return initVoteObj
}

const MostVotes = ({ votes }) => {
  let copy = votes

  copy =  Object.keys(copy).reduce((a,b) => copy[a] > copy[b] ? a : b)
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdotes selected={copy[0]} />
      <Votes votes={votes} selected={copy[0]} />
    </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotesState)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdotes selected={selected} />
      <Votes votes={votes} selected={selected} />
      <Button onClick={() => {incrementVote(selected, votes, setVotes)}} text="Vote" />
      <Button onClick={() => {setSelected(randomNum())}} text="Next Anecdote" />
      <MostVotes votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App />,
  document.getElementById('root')
)