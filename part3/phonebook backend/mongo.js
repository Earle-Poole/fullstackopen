const mongoose = require('mongoose')

const devMode = "Work"
let url;
let phoneNumber;
let name;

if (devMode === "Home"){
  if( process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  name = process.argv[3]
  phoneNumber = process.argv[4]
  
  url = `mongodb+srv://fullstack:${password}@fullstackopen-kq5bx.mongodb.net/admin?retryWrites=true&w=majority`  
} 
else if (devMode === "Work") {
  url = `mongodb://127.0.0.1:27017/fullstack`
  name = process.argv[2]
  phoneNumber = process.argv[3]
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  id: Number,
  phoneNumber: String
})

const Person =  mongoose.model('Person', personSchema)

const person = new Person({
  name: name || null,
  date: new Date(),
  id: `${Math.floor(Math.random() * 10000)}`,
  phoneNumber: phoneNumber || null
})

if( person.name && person.phoneNumber){
  person.save()
    .then(res => {
      console.log(`added ${person.name} number ${person.phoneNumber} to phonebook`)
      mongoose.connection.close()
    })
    .catch(err => console.log('could not save', err))
} else if ( !person.name && !person.phoneNumber){
  Person.find({})
    .then(res => {
      res.forEach(resPerson => {
        console.log("phonebook:")
        console.log(resPerson.name, resPerson.phoneNumber)
        mongoose.connection.close()
      })
    })
}

