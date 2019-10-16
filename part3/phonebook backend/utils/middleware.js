const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError' && errorHandler.kind === 'ObjectID'){
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }

  next(err)
}

const unknownEndpoint = ( req, res ) => {
  res.status(404).send({ err: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}