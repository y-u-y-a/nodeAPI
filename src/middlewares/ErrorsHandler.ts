import { ErrorRequestHandler } from 'express'

class ErrorsHandler {
  serverError: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message })
  }
}

export default new ErrorsHandler()
