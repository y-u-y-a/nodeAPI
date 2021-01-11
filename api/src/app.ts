import express from 'express'
import { urlencoded, json } from 'body-parser'

import DB from '@/config/database'
import ApiRoutes from '@/routers/api'
import Errors from '@/middlewares/ErrorsHandler'

// setup
const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(Errors.serverError)
DB.connect()

// routes
app.use('/api', ApiRoutes)

// start
app.listen(process.env.PORT)
console.log(`listen on port ${process.env.PORT}...`)
