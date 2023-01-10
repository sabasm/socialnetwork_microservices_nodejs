import express, { urlencoded, json } from 'express'
const app = express()
import { API } from '../config.js'
import user from './components/user/network.js'
import auth from './components/auth/network.js'
// import post from './components/post/network.js'//extracted to microservice
import errors from '../network/errors.js'

//MIDDLEWARES
app.use(urlencoded({ extended: true }))
app.use(json())

//ROUTES
app.use('/api/user', user)
app.use('/api/auth', auth)
// app.use('/api/post', post)//extracted to microservice

app.use(errors)
app.listen(API.PORT, () => {
  console.log(`Server running on port http://localhost:${API.PORT}`)
})
