import express from 'express'
import { urlencoded, json } from 'body-parser'

import DB from '@/config/database'
import Routes from '@/config/routes'
import Errors from '@/controllers/ErrorsController'

const environment = process.env.NODE_ENV || 'dev'
const crossEnv = require(`../env.${environment}.js`)

// setup
const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(Errors.serverError)
DB.connect()

// set routes
app.use('/', Routes)

// start
app.listen(crossEnv.port)
console.log(`listen on port ${crossEnv.port}...`)
