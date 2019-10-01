import  React from 'react'

const Inputs = ({ addName, newName, handleNameChange, newNumber, handleNumberChange, filter, handleFilterChange }) => {
  return(
    <form onSubmit={addName}>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
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

export default Inputs