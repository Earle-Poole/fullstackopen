import axios from 'axios'

const baseUrl = 'http://localhost:3001/initialBlogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async blog => {
  const res = await axios.post(baseUrl, blog)
  return res.data
}

const addCommentToBlog = async (blogID, comment) => {
  
  const res = await axios.post(`${baseUrl}/`)
  return res.data
}

export default { getAll, createNew }
