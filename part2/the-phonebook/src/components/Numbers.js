import React from 'react'

const Numbers = ({persons, filter}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const numbersArr = filteredPersons.map((person, i) => {
    return <p key={i}>{person.name} {person.number}</p>
  })
  return (
    <div>
      {numbersArr}
    </div>
  )
}

export default Numbers
