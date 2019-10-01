import React, { useState } from 'react'

const Inputs = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return(
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      phone: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find((person) => person.name === nameObject.name)

    if (duplicate) alert(`${nameObject.name} is already added to phonebook`)
    else setPersons(persons.concat(nameObject));setNewName('');setNewNumber('')
  }

  const Numbers = () => {
    const numbersArr = persons.map((person, i) => `${person.name} ${person.number}`)
    return (
      <div>
        {numbersArr}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Inputs 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Numbers />
    </div>
  )
}

export default App