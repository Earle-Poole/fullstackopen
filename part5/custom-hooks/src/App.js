import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    setValue,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = useCallback(async () => {
    const request = await axios.get(baseUrl)
    setResources(request.data)
    return request.data
  }, [baseUrl])

  useEffect(() => {
    getAll()
  }, [getAll])

  const create = async (resource) => {
    const responseFromCreate = await axios.post(baseUrl, resource)
    getAll()
    return responseFromCreate.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.setValue('')
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.setValue('')
    number.setValue('')
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App