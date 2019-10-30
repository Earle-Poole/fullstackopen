import React from "react"
import { useField } from "../hooks"

const NewBlogForm = ({ handleNewBlog }) => {
  const resetScrubber = field => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = field
    return noReset
  }
  const titleField = useField("text", "Title")
  const authorField = useField("text", "Author")
  const urlField = useField("text", "URL")

  return (
    <form
      onSubmit={e => {
        handleNewBlog(e, titleField, authorField, urlField)
        titleField.reset()
        authorField.reset()
        urlField.reset()
      }}>
      <div>
        title
        <input {...resetScrubber(titleField)} />
      </div>
      <div>
        author
        <input {...resetScrubber(authorField)} />
      </div>
      <div>
        url
        <input {...resetScrubber(urlField)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default NewBlogForm
