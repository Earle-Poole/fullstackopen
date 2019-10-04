const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const persons =  [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
