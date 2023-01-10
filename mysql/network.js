import express from 'express'
import * as response from '../network/response.js'
import Store from '../store/mysql.js'

const router = express.Router()

//Routes
router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', upsert)
router.put('/:table', upsert)

//Functions
async function list (req, res, next) {
  const table = req.params.table
  const data = await Store.list(table)
  response.sucess(req, res, data, 200)
}

async function get (req, res, next) {
  const table = req.params.table
  const id = req.params.id

  const data = await Store.get(table, id)
  response.sucess(req, res, data, 200)
}

async function upsert (req, res, next) {
  const table = req.params.table
  const data = req.body

  const result = await Store.upsert(table, data)
  response.sucess(req, res, result, 201)
}

export default router
