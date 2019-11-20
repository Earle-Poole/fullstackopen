/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import blogsService from '../services/blogs'
import { generateID } from '../utils/tools'

export const initializeBlogs = () => async (dispatch) => {
  const initialBlogs = await blogsService.getAll()
  const blogVals = Object.values(initialBlogs)

  blogVals.map((user) => {
    for (const blog of Object.keys(user.blogsList)) {
      user.blogsList[blog].userID = user.id
    }
    return null
  })

  dispatch({
    type: 'INIT_BLOGS',
    data: blogVals,
  })
}

export const commentOnBlog = (blogID, comment, blogsByUser) => async (dispatch) => {
  const selectedBlog = blogsByUser.map((user) => Object.values(user.blogsList).find((blog) => blog.id === blogID))
    .filter((user) => {
      if (user === undefined) {
        return false
      }
      return true
    })[0]

  const selectedUser = blogsByUser.find((user) => user.id === selectedBlog.userID)

  const selectedUserIndex = Object.values(selectedUser.blogsList).findIndex((blog) => blog.id === blogID)

  const selectedBlogsCommentLength = Object.values(Object.values(selectedUser.blogsList)[selectedUserIndex].comments).length

  selectedUser.blogsList[selectedUserIndex].comments[selectedBlogsCommentLength] = comment

  const blogsByUserWithAddedComment = blogsByUser.map((user) => {
    Object.values(user.blogsList).find((blog) => {
      if (blog.id === blogID) {
        user.blogsList = selectedUser.blogsList
      }
      return true
    })
    return user
  })

  const res = await blogsService.addCommentToBlog(blogsByUserWithAddedComment)

  dispatch({
    type: 'COMMENT_BLOG',
    data: res,
  })
}

export const voteBlog = (IDObj) => async (dispatch) => {
  dispatch({
    type: 'VOTE_BLOG',
    IDObj,
  })
}

export const newBlog = (blog) => async (dispatch) => {
  dispatch({
    type: 'NEW_BLOG',
    blog,
  })
}

const blogReducer = (state = [], action) => {
  let newState = [...state]

  switch (action.type) {
    case 'INIT_BLOGS':
      newState = action.data
      return newState
    case 'NEW_BLOG':
      const matchingUser = newState.findIndex((user) => user.username === action.blog.username)

      if (matchingUser === -1) {
        const newUserAndBlog = {
          username: action.blog.username,
          blogsList: [{ content: action.blog.content, id: generateID() }],
          id: generateID(),
        }

        return [...newState, newUserAndBlog]
      }

      const createdBlog = {
        content: action.blog.blogContent,
        id: action.blog.id,
      }

      newState[matchingUser].blogsList.push(createdBlog)

      return newState

    case 'VOTE_BLOG':
      const votedUser = newState.findIndex((user) => user.id === action.IDObj.userID)

      const votedBlog = Object.values(newState[votedUser].blogsList).findIndex((blog) => blog.id === action.IDObj.blogID)

      newState[votedUser].blogsList[votedBlog].votes += 1

      return newState
    default:
      return state
  }
}

export default blogReducer
