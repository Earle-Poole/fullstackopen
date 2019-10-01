import React, { useState } from 'react'
import Inputs from './components/Inputs'
import Numbers from './components/Numbers'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Earle Poole', number: '123-456-7890' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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



  return (
    <div>
      <h2>Phonebook</h2>
      <Inputs 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter}/>
    </div>
  )
}

export default App