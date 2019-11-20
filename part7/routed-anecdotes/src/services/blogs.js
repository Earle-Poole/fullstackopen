import axios from 'axios'

const baseUrl = 'http://localhost:3001/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (blog) => {
  const res = await axios.post(baseUrl, blog)
  return res.data
}

const addCommentToBlog = async (blogsListWithNewComment) => {
  const res = await axios.put(baseUrl, blogsListWithNewComment)
  return res.data
}

export default { getAll, createNew, addCommentToBlog }
