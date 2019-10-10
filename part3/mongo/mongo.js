const mongoose = require('mongoose')

const devMode = "Work"
let url;

if (devMode === "Home"){
  if( process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  url = `mongodb+srv://fullstack:${password}@fullstackopen-kq5bx.mongodb.net/admin?retryWrites=true&w=majority`  
} else if (devMode === "Work") {
  url = `mongodb://127.0.0.1:27017/fullstack`
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  id: Number,
  phoneNumber: String
})

const Person =  mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Pena Fena bo Bena.. Dena!',
  date: new Date(),
  id: `${Math.floor(Math.random() * 10000)}`,
  phoneNumber: `${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`
})

person.save()
  .then(res => {
    console.log('Person saved!')
    console.log(person)
    mongoose.connection.close()
  })
  .catch(err => console.log('could not save', err))

