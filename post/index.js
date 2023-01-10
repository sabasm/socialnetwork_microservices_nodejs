import express, { urlencoded, json } from 'express'
const app = express()
import { POST_SERVICE } from '../config.js'
import post from './components/post/network.js'
import errors from '../network/errors.js'

const { API } = POST_SERVICE

//MIDDLEWARES
app.use(urlencoded({ extended: true }))
app.use(json())

//ROUTES
app.use('/api/post', post)

app.use(errors)
app.listen(API.PORT, () => {
  console.log(`Server running on port http://localhost:${API.PORT}`)
})
