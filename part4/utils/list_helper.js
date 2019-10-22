/* eslint-disable arrow-parens */
const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const result = blogs.length === 0 ? 0 : likes.reduce((acc, current) => acc + current)

  return result
}

const favoriteBlog = blogs => {
  const favorite = blogs.reduce((acc, curr) => {
    if (curr.likes > acc.likes) return curr
    return acc
  })
  return favorite
}

const mostBlogs = blogs => {
  const authors = _.map(blogs, 'author')
  const blogCount = {}
  let tempAcc = {}

  authors.forEach(author => {
    if (blogCount[author] === undefined) blogCount[author] = 1
    else blogCount[author] += 1
  })

  _.transform(blogCount, (acc, val, key) => {
    if (Object.values(acc).length === 0) {
      tempAcc = { author: key, blogs: val }
    }

    if (acc.length > 0 && Object.values(acc[0]) < val) {
      tempAcc = { author: key, blogs: val }
    }
  }, {})

  return tempAcc
}

const mostLikes = blogs => {
  // arr of authors
  const authors = _.map(blogs, 'author')
  // arr of likes
  const likes = _.map(blogs, 'likes')
  const likeCount = {}

  // creates likeCount object with author/likes pair
  authors.forEach((author, i) => {
    if (likeCount[author] === undefined) {
      likeCount[author] = { likes: likes[i] }
    } else {
      likeCount[author] = { likes: likeCount[author].likes + likes[i] }
    }
  })

  const highestLikes = _.reduce(likeCount, (acc, val, key) => {
    if (acc.likes > val.likes) return acc

    acc.author = key
    acc.likes = val.likes
    return acc
  })

  return highestLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
