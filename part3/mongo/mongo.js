const mongoose = require('mongoose')

if( process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${}@fullstackopen-kq5bx.mongodb.net/admin?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number
})

const Person =  mongoose.model('Person', personSchema)

const person = new Person({
  content: 'HTML is easy',
  date: new Date(),
  important: true
})

person.save()
  .then(res => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  .catch(err => console.log('could not save', err))

