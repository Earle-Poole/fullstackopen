const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@fullstackopen-shard-00-00-kq5bx.mongodb.net:27017,fullstackopen-shard-00-01-kq5bx.mongodb.net:27017,fullstackopen-shard-00-02-kq5bx.mongodb.net:27017/test?ssl=true&replicaSet=FullstackOpen-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  content: 'Earle Poole',
  date: new Date(),
  important: true,
})

person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})