import jwt from 'jsonwebtoken'
import { JWT } from '../config.js'
import error from '../utils/error.js'

function decodeHeader (req) {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verifyToken(token)
  req.user = decoded
  return decoded
}

function getToken (authorization) {
  if (!authorization) {
    throw error('No token provided', 401)
  }
  if (!authorization.startsWith('Bearer ')) {
    throw error('Invalid access', 401)
  }
  return authorization.replace('Bearer ', '')
}

function signToken (data) {
  return jwt.sign(data, JWT.SECRET)
}

function verifyToken (token) {
  return jwt.verify(token, JWT.SECRET)
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)
    if (decoded.id !== owner) {
      throw error('Not authorized', 401)
    }
  },
  logged: req => {
    decodeHeader(req)
  }
}

export default {
  signToken,
  verifyToken,
  check
}
