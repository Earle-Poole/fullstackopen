import axios from "axios"

const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)

  return request.data
}

const createBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)

  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("config", config)
  const baseUrlAndID = `${baseUrl}/${blog.id}`
  const response = await axios.delete(baseUrlAndID, config)

  return response.data
}

const incrementLikes = async blog => {
  const baseUrlAndID = `${baseUrl}/${blog.id}`
  const newLikes = blog.likes + 1
  const newBlog = {
    title: blog.title,
    likes: newLikes,
    author: blog.author,
    url: blog.url,
    _id: blog.id,
    userid: {
      blogs: blog.userid.blogs,
      username: blog.userid.username,
      name: blog.userid.name,
      _id: blog.userid.id,
    },
  }

  const response = await axios.put(baseUrlAndID, newBlog)

  return response.data
}

export default {
  getAll,
  createBlog,
  setToken,
  incrementLikes,
  deleteBlog,
}
