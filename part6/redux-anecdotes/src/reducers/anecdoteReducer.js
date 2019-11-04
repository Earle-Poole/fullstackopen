import anecdoteService from '../services/anecdotes'

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const res = await anecdoteService.incrementVote(anecdote)
    console.log('res', res)
    dispatch({
      type: "VOTE",
      id: anecdote.id,
    })
  }
}

export const addedAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newNote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  let newState = [...state]
  switch (action.type) {
    case "VOTE":
      const votedAnecdote = newState.findIndex(
        anecdote => anecdote.id === action.id
      )
      newState[votedAnecdote].votes += 1

      return newState

    case "NEW_ANECDOTE":
      console.log("action in NEW_ANECDOTE", action.data)
      return [...state, action.data]

    case "INIT_ANECDOTES":
      return action.data
      
    default:
      return state
  }
}

export default anecdoteReducer
