import blogsService from "../services/blogs"
import { generateID } from "../utils/tools"

const initialBlogs = [
  {
    author: "Earle Poole",
    blogsList: [
      {
        content: "Nullam consectetur suscipit tortor, feugiat.",
        id: generateID(),
      },
      { content: "Vestibulum volutpat nisl et nibh.", id: generateID() },
      { content: "Donec placerat ex sit amet.", id: generateID() },
    ],
    id: generateID(),
  },
  {
    author: "Not Earle Poole",
    blogsList: [
      { content: "Curabitur euismod accumsan nibh, eu.", id: generateID() },
      { content: "Donec tincidunt nibh in venenatis.", id: generateID() },
      { content: "Interdum et malesuada fames ac.", id: generateID() },
      { content: "Cras laoreet, diam in finibus.", id: generateID() },
    ],
    id: generateID(),
  },
]

export const initializeBlogs = () => {
  return async dispatch => {
    // const blogs = await blogsService.getAll()

    // console.log("blogs", blogs)

    dispatch({
      type: "INIT_BLOGS",
      // data: blogs
    })
  }
}

export const voteBlog = async id => {
  return async dispatch => {
    const blog = await blogsService.voteByBlogID(id)

    dispatch({
      type: "VOTE_BLOG",
      data: blog,
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

const blogReducer = (state = initialBlogs, action) => {
  let newState = [...state]

  switch (action.type) {
    case "INIT_BLOGS":
      return state
    case "NEW_BLOG":
      const matchingUser = newState.findIndex(user => {
        return user.author === action.blog.author
      })

      if (matchingUser === -1) {
        const newAuthorAndBlog = {
          author: action.blog.author,
          blogsList: [{ content: action.blog.content, id: generateID() }],
          id: generateID(),
        }

        return [...newState, newAuthorAndBlog]
      }

      const newBlog = {
        content: action.blog.blogContent,
        id: action.blog.id
      }

      newState[matchingUser].blogsList.push(newBlog)

      return newState

    case "VOTE_BLOG":
      const votedBlog = newState.findIndex(
        blog => blog.id === action.data.blog.id
      )

      newState[votedBlog].votes += 1

      return newState
    default:
      return state
  }
}

export default blogReducer
