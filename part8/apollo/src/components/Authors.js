import React from 'react'
import Author from './Author'
import { gql } from 'apollo-boost'


const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor
  }
`


const Authors = ({ result }) => {
  if (result.loading){
    return <div>loading...</div>
  }

  console.log("result", result)
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      {authors.map(a =>
        <Author info={a} />
      )}
    </div>
  )
}

export default Authors