import axios from 'axios'

const baseUrl = 'http://localhost:3005/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async anecdote => {
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const incrementVote = async anecdote => {
  const specificUrl = `${baseUrl}/${anecdote.id}`
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(specificUrl, newAnecdote)
  return res.data
}

export default { getAll, createNew, incrementVote }
