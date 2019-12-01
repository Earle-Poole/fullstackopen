import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'

const query = gql`
{
  allAuthors  {
    name,
    bookCount,
    born
  }
}
`

const App = () => {
  return (
    <ApolloConsumer>
      {(client => 
        <Query query={query}>
          {(result) => <Authors result={result} client={client} />}
        </Query>
      )}
    </ApolloConsumer>
  )
}

export default App
