import express from 'express'
import { urlencoded, json } from 'body-parser'

import DB from '@/config/database'
import ApiRoutes from '@/routers/api'
import ViewsRoutes from '@/routers/views'
import Errors from '@/middlewares/ErrorsHandler'

// env
const environment = process.env.NODE_ENV || 'dev'
const crossEnv = require(`../env.${environment}.js`)

// setup
const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(Errors.serverError)
DB.connect()

// routes
app.use('/api', ApiRoutes)

// start
app.listen(crossEnv.port)
console.log(`listen on port ${crossEnv.port}...`)
