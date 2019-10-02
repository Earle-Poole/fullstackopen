import React from 'react'

const Search = ({searchCountry, handleSearchCountry}) => {
  return (
    <div>
      find countries <input value={searchCountry} onChange={handleSearchCountry} />
    </div>
  )
}

export default Search