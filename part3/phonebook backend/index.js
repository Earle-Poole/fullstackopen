const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('reqBody', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqBody"))

function requestLogger (req, res, next) {gi
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

function unknownEndpoint (req, res) {
  res.status(404).send({error: "unkown endpoint"})
}

let persons =  [
    {
      "name": "Steven Rigadoceus",
      "number": "39-24-6423122",
      "id": 2
    },
    {
      "name": "Yehuda Bevy",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Earle Poole",
      "number": "1813487132",
      "id": 5
    },
    {
      "name": "Margarita Spool",
      "number": "213-69-6969",
      "id": 6
    },
    {
      "name": "Mona Surrevy",
      "number": "123-123-123-123",
      "id": 7
    },
    {
      "name": "Friskina Pivera",
      "number": "145-145-1458",
      "id": 8
    }
  ]

const generateID = () => {
  return Math.floor(Math.random() * 10000) 
}



app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id
  const person = persons.find(person => person.id === id)
  
  if(person)
  res.json(person);
  else
  res.status(404).end()
})

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${new Date()}</p>`)
})

app.post("/api/persons", (req, res) => {
  const newPerson = {...req.body, id: generateID()}
  console.log('newPerson :', newPerson);
  const dupePerson = () => persons.filter(person => person.name === newPerson.name).length === 0 ? false : true
  console.log('dupePerson :', dupePerson());
  const dupeID = () => persons.filter(person => person.id === newPerson.id).length === 0 ? false : true
  console.log('dupeID :', dupeID());
  if(!dupePerson() && !dupeID()) {
    persons = persons.concat(newPerson)
    res.json(persons)
  } else {
    if(dupePerson() && dupeID())
    res.status(404).json({error: 'name and id must be unique'}).end()
    else if (dupePerson() && !dupeID())
    res.status(404).json({error: 'name must be unique'}).end()
    else
    res.status(404).json({error: 'id must be unique'}).end()
  }

  console.log('persons :', persons)
  return { theBest: "Earle Poole" }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id
  const personsFiltered = persons.filter(person => person.id !== id)
  const deletedPerson = persons.filter(person => person.id === id)
  
  if(deletedPerson.length > 0)
  res.json(personsFiltered)
  else
  res.status(404).end()
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
