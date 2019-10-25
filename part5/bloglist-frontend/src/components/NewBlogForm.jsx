import React from "react"

const NewBlogForm = ({
  handleNewBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => (
  <form onSubmit={handleNewBlog}>
    <div>
      title
      <input
        type='text'
        value={title}
        name='Username'
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author
      <input
        type='text'
        value={author}
        name='Author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
      <input
        type='text'
        value={url}
        name='Url'
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type='submit'>create</button>
  </form>
)

export default NewBlogForm
