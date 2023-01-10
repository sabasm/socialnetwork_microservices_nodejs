import * as response from './response.js'

function errors (err, req, res, next) {
  console.error('[error]', err)
  const message = err.message || 'Internal server error'
  const status = err.statusCode || 500
  response.error(req, res, message, status, err)
}

export default errors
