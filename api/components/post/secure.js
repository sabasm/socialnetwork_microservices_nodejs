import auth from '../../../auth/index.js'

export const CASE = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  GET: 'get',
  LIST: 'list',
  FOLLOW: 'follow'
}

export default function checkAuth (action) {
  function middleware (req, res, next) {
    switch (action) {
      case CASE.UPDATE:
        const owner = req.body.id
        auth.check.own(req, owner)
        next()
        break
      case CASE.FOLLOW:
        auth.check.logged(req)
        next()
        break
      default:
        next()
    }
  }
  return middleware
}
