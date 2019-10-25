import React, { useState, useEffect } from "react"
import blogsService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"
import Message from "./components/Message"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import NewBlogForm from "./components/NewBlogForm"
import Blog from "./components/Blog"

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [messageStatus, setMessageStatus] = useState()

  async function getBlogs() {
    const resBlogs = await blogsService.getAll()
    setBlogs(resBlogs)
  }

  const loggedUser = window.localStorage.getItem("loggedBlogAppUser")

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    if (loggedUser) {
      const loggedUserJson = JSON.parse(loggedUser)
      setUser(loggedUserJson)
    }
  }, [loggedUser])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedInUser)
      )
      setUser(loggedInUser)
      setUsername("")
      setPassword("")
      setMessageStatus(true)
      setMessage("Login successful")
      setTimeout(() => {
        setMessageStatus(null)
        setMessage("")
      }, 5000)
    } catch (err) {
      const errorMessage = () => {
        setMessageStatus(false)
        setMessage(err.response.data.err)
        setTimeout(() => {
          setMessageStatus(null)
          setMessage("")
        }, 5000)
      }
      errorMessage()
    }
  }

  const handleLogout = async e => {
    e.preventDefault()

    try {
      window.localStorage.removeItem("loggedBlogAppUser")
      setUser(null)
      setUsername("")
      setPassword("")
      setMessageStatus(true)
      setMessage("Logout successful")
      setTimeout(() => {
        setMessageStatus(null)
        setMessage("")
      }, 5000)
    } catch (err) {
      throw err("there was an error: ", err)
    }
  }

  const handleNewBlog = async e => {
    e.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url,
        likes: Math.floor(Math.random() * 100000),
      }

      blogsService.setToken(user.token)

      const blog = await blogsService.createBlog(newBlog)

      setTitle("")
      setAuthor("")
      setUrl("")
      setMessageStatus(true)
      setMessage(`Added ${blog.title}`)
      setTimeout(() => {
        setMessageStatus(null)
        setMessage("")
      }, 5000)
      getBlogs()
    } catch (err) {
      throw err("there was an error: ", err)
    }
  }

  const titleSort = (a, b) => {
    const titleA = a.title.toLowerCase()
    const titleB = b.title.toLowerCase()

    if (titleA < titleB) return -1
    if (titleB < titleA) return 1
    return 0
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to the application</h1>
          <Message messageStatus={messageStatus} message={message} />
          <Togglable buttonLabel='show login'>
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <BlogForm
            handleLogout={handleLogout}
            messageStatus={messageStatus}
            message={message}
            user={user}>
            <Togglable buttonLabel='create new blog'>
              <h1>create new</h1>
              <NewBlogForm
                handleNewBlog={handleNewBlog}
                title={title}
                author={author}
                url={url}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setUrl={setUrl}
              />
            </Togglable>
            {blogs
              .sort((a, b) => titleSort(a, b))
              .map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  loggedUser={loggedUser}
                  deleteBlog={blogsService.deleteBlog}
                  getBlogs={getBlogs}
                  incrementLikes={blogsService.incrementLikes}
                />
              ))}
          </BlogForm>
        </div>
      )}
    </div>
  )
}

export default App
