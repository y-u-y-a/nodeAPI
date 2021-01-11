import express, { urlencoded, json } from 'express'
import morgan from 'morgan'

import DB from '@/config/database'
import ApiRoutes from '@/routers/api'
import Errors from '@/middlewares/errorsHandler'

// setup
const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan(process.env.NODE_ENV || 'dev'))
app.use(Errors.serverError)
DB.connect()

// routes
app.use('/api', ApiRoutes)

// start
app.listen(process.env.PORT)
console.log(`listen on port ${process.env.PORT}...`)
