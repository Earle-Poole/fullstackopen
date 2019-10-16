const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () =>{
  test('if empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: String,
        author: String,
        url: String,
        likes: 65,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(65)
  })

  test('if a bigger list is calculated correctly', () => {
    const blogs = [
      {
        title: String,
        author: String,
        url: String,
        likes: 65,
      }, {
        title: String,
        author: String,
        url: String,
        likes: 99,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(164)
  })

  test('which is the favorite blog', () => {
    const blogs = [
      {
        title: 'Title Numero 1',
        author: 'Senior Sir',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 2',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })

  test('which author has the most blogs', () => {
    const blogs = [
      {
        title: 'Title Numero 1',
        author: 'Senior Sir',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 2',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 3',
        author: 'Senior Sir',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 4',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 5',
        author: 'Seniorita Maam',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 6',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      },
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toStrictEqual({
      author: 'Frisky Dingo',
      blogs: 5,
    })
  })

  test('which author has the most likes', () => {
    const blogs = [
      {
        title: 'Title Numero 1',
        author: 'Senior Sir',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 2',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 3',
        author: 'Senior Sir',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 4',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 5',
        author: 'Seniorita Maam',
        url: String,
        likes: 165,
      }, {
        title: 'Title Numero 6',
        author: 'Seniorita Maam',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      }, {
        title: 'Title Numero 6',
        author: 'Frisky Dingo',
        url: String,
        likes: 199,
      },
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toStrictEqual({
      author: 'Frisky Dingo',
      likes: 995,
    })
  })
})
