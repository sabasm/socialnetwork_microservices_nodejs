export function sucess (req, res, message = '', status = 200) {
  res.status(status).send({
    status,
    body: message
  })
}
export function error (req, res, message='Unhandled error', status=500, details='Unhandled error') {
  console.error('[response error] ' + details)
  res.status(status).send({
    error: true,
    status,
    body: message
  })
}
