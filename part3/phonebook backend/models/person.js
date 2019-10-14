const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const devMode = "Home"
let url;

if (devMode === "Home"){
  // if( process.argv.length < 3){
  //   console.log('give password as argument')
  //   process.exit(1)
  // }
  
  // const password = process.argv[2]
  // name = process.argv[3]
  // phoneNumber = process.argv[4]
  url = process.env.MONGODB_URI_HOME
  // url = `mongodb+srv://fullstack:${password}@fullstackopen-kq5bx.mongodb.net/admin?retryWrites=true&w=majority`  
} 
else if (devMode === "Work") {
  url = process.env.MONGODB_URI_WORK
  // name = process.argv[2]
  // phoneNumber = process.argv[3]
}

mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connected to  MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    minlength: 8,
    required: true
  }
})
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose.connection.on('open', (ref) => {
  console.log("Connected to mongo server");
  mongoose.connection.db.listCollections().toArray((err, names) => {
    console.log(names);
  })
})

module.exports = mongoose.model('Person', personSchema)
