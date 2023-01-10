import express from 'express'
import secure, { CASE } from './secure.js'
import * as response from '../../../network/response.js'
import Controller from './index.js'

const router = express.Router()

//Functions
const list = async (req, res, next) => {
  try {
    const list = await Controller.list()
    response.sucess(req, res, list, 200)
  } catch (error) {
    next(error)
  }
}

const get = async (req, res, next) => {
  try {
    const user = await Controller.get(req.params.id)
    response.sucess(req, res, user, 200)
  } catch (error) {
    next(error)
  }
}

const upsert = async (req, res, next) => {
  try {
    const user = await Controller.upsert(req.body)
    response.sucess(req, res, user, 201)
  } catch (error) {
    next(error)
  }
}

async function follow (req, res, next) {
  try {
    console.log(req.user.id, req.params.id)
    const data = await Controller.follow(req.user.id, req.params.id)
    response.sucess(req, res, data, 201)
  } catch (error) {
    next(error)
  }
}
async function following (req, res, next) {
  try {
    const data = await Controller.following(req.params.id)
    response.sucess(req, res, data, 201)
  } catch (error) {
    next(error)
  }
}

//Routes
router.get('/', list)
router.get('/:id', get)
router.get('/:id/following', following)

router.post('/follow/:id', secure(CASE.FOLLOW), follow)
router.post('/', upsert)

router.put('/', secure(CASE.UPDATE), upsert)

export default router
