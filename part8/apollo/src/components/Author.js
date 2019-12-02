import React from 'react'

const Author = props => {
  const { info } = props

  console.log("info", info)

  return (
    <div key={info.name}>
      {info.name} {info.bookCount} {info.born}
    </div>
  )
}

export default Author
