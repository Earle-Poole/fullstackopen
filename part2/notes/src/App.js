import React, { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Notes'
import Notification from './components/Notification'
import noteService from './services/notes'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const toggleImportanceOf = id => {
    // const url = `http://localhost:3001/notes${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes[notes.length-1].id + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setSuccessMessage(true)
        setMessage(`Added "${noteObject.content}"`)
        setTimeout(()=> {
          setMessage(null)
          setSuccessMessage(false)
        }, 5000)
      }) 
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message} successMessage={successMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App 
