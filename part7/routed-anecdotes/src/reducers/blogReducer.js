import blogsService from "../services/blogs"
import { generateID } from "../utils/tools"

export const initializeBlogs = () => {
  return async dispatch => {
    const initialBlogs = await blogsService.getAll()

    initialBlogs.map(user => {
      user.blogsList.map(blog => {
        blog.userID = user.id
        return null
      })
      return null
    })

    dispatch({
      type: "INIT_BLOGS",
      data: initialBlogs
    })
  }
}

export const voteBlog = IDObj => {
  return async dispatch => {
    // const blog = await blogsService.voteByBlogID(id)

    dispatch({
      type: "VOTE_BLOG",
      IDObj: IDObj,
    })
  }
}

export const newBlog = blog => {
  return async dispatch => {
    dispatch({
      type: "NEW_BLOG",
      blog,
    })
  }
}

const blogReducer = (state = [], action) => {
  let newState = [...state]

  switch (action.type) {
    case "INIT_BLOGS":
      newState = action.data
      return newState
    case "NEW_BLOG":
      const matchingUser = newState.findIndex(user => {
        return user.username === action.blog.username
      })

      if (matchingUser === -1) {
        const newUserAndBlog = {
          username: action.blog.username,
          blogsList: [{ content: action.blog.content, id: generateID() }],
          id: generateID(),
        }

        return [...newState, newUserAndBlog]
      }

      const newBlog = {
        content: action.blog.blogContent,
        id: action.blog.id,
      }

      newState[matchingUser].blogsList.push(newBlog)

      return newState

    case "VOTE_BLOG":
      console.log("newState in VOTE_BLOG", newState)
      console.log("action in VOTE_BLOG", action.IDObj)
      const votedUser = newState.findIndex(user => {
        return user.id === action.IDObj.userID
      })

      const votedBlog = newState[votedUser].blogsList.findIndex(blog => {
        return blog.id === action.IDObj.blogID
      })

      newState[votedUser].blogsList[votedBlog].votes += 1

      return newState
    default:
      return state
  }
}

export default blogReducer
