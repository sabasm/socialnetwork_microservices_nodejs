import express from 'express'
import * as response from '../../../network/response.js'
import Controller from './index.js'

const router = express.Router()

//Functions
const login = async (req, res) => {
  try {
    const auth = await Controller.login(req.body.username, req.body.password)
    response.sucess(req, res, auth, 200)
  } catch (error) {
    response.error(req, res, 'Invalid credentials', 400, error)
  }
}

//Routes
router.post('/login', login)

export default router
