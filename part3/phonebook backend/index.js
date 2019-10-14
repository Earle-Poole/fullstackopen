require('dotenv').config()
const express = require("express")
//parse incoming request bodies
const bodyParser = require("body-parser")
//http request logger middleware
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const Person = require('./models/person')

let phoneNumber;
let name;
let persons;


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('reqBody', function (req, res) {
  // console.log('req.body :', req.body);
  return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqBody"))

const generateID = () => {
  return Math.floor(Math.random() * 10000) 
}



let person = new Person({
  name: name || null,
  date: new Date(),
  phoneNumber: phoneNumber || null
})

//query the database for list of persons, store in a variable
Person.find({})
  .then(people => {
    persons = people
  })

//display list of existing persons
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(people => {
      console.log("people", people)
      res.json(people.map(person => person.toJSON()))
    })
});

app.get("/api/persons/:id", (req, res, next) => {  
  Person.findById(req.params.id)
    .then(resPerson => {
      if(resPerson)
        res.json(resPerson)
      else 
        res.status(404).end()
    })
    .catch(err => {
      if (req.params.id === "Dena"){
        return res.send(
          `<h1>WTF IS UP DENA PENA?!</h1>
          <br/>
          <img src='https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/48359353_10210453155724008_940856476459597824_n.jpg?_nc_cat=106&_nc_oc=AQkCfGLNRvL6jrGqwtVDXMU3buIdIZItxSOUeKtKz-IFT272RQvdeOuvR8scfkfuCQU&_nc_ht=scontent-atl3-1.xx&oh=85c83afe795f984e20c8d0920bdfe1ac&oe=5E2EB623' alt='' />`
        )
      }
      else if (req.params.id === "Diane"){
        res.send(`<iframe src="https://giphy.com/embed/hmZtValohxXby" width="480" height="357" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`)
      }
      else {
        next(err)
      }
    })
})

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${new Date()}</p>`)
})

app.post("/api/persons", (req, res, next) => {
  //if a name isn't provided then stop the post
  if (req.body.name === '' || req.body.name === undefined){
    console.log("name is missing")
    res.status(404).json({error: "name is missing"})
  }

  //creates newPerson from the posted request
  const newPerson = req.body

  //returns booleans if person's name matches an existing one
  const dupePerson = persons.filter(person => person.name === newPerson.name).length === 0 ? false : true

  if(!dupePerson) {
    person.name = newPerson.name
    person.phoneNumber = newPerson.phoneNumber
    person.save()
      .then(saveRes => {
        console.log(`added ${person.name}!`)
        res.json(saveRes)
        person = new Person({
          name: name || null,
          date: new Date(),
          phoneNumber: phoneNumber || null
        })
      })
      .catch(err => next(err))

  } else res.status(404).json({error: 'name must be unique'}).end()
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  }

  Person.findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError' && errorHandler.kind === 'ObjectID'){
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
