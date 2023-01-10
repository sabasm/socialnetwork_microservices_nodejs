import express, { urlencoded, json } from 'express'
const app = express()
import { MYSQL_SERVICE } from '../config.js'
import errors from '../network/errors.js'
import router from './network.js'

const { API } = MYSQL_SERVICE

//MIDDLEWARES
app.use(urlencoded({ extended: true }))
app.use(json())

//ROUTES
app.use('/', router)

app.use(errors)
app.listen(API.PORT, () => {
  console.log(`Server running on port http://localhost:${API.PORT}`)
})
