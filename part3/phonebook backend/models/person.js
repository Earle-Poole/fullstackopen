const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const devMode = "Work"
let url;

if (devMode === "Home"){
  if( process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  name = process.argv[3]
  phoneNumber = process.argv[4]
  url = process.env.MONGODB_URI_HOME
  // url = `mongodb+srv://fullstack:${password}@fullstackopen-kq5bx.mongodb.net/admin?retryWrites=true&w=majority`  
} 
else if (devMode === "Work") {
  url = process.env.MONGODB_URI_WORK
  name = process.argv[2]
  phoneNumber = process.argv[3]
}

mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connected to  MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  phoneNumber: String
})
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
