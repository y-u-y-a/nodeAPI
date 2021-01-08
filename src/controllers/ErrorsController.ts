import { ErrorRequestHandler } from 'express'

class Errors {
  serverError: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message })
  }
}

export default new Errors()
