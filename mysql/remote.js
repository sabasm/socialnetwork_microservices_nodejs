import request from 'request'

function createRemoteDb (host, port) {
  const URL = 'http://' + host + ':' + port
  function list (table) {
    return req('GET', table)
  }
  function get (table, id) {
    return req('GET', table, id)
  }
  function upsert (table, data) {
    return req('POST', table, data)
  }
  function query (table, query) {
    return req('POST', table + '/query', query)
  }
  function req (method, table, data) {
    let url = URL + '/' + table
    let body = ''
    if (method === 'GET' && data) {
      url += '/' + data
    } else {
      body = JSON.stringify(data)
    }
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            'content-type': 'application/json'
          },
          url,
          body
        },
        (err, req, body) => {
          if (err) {
            console.error('Error con la base de datos remota', err)
            return reject(err.message)
          }
          const resp = JSON.parse(body)
          return resolve(resp.body)
        }
      )
    })
  }

  return {
    list,
    get,
    upsert,
    query
  }
}

export default createRemoteDb
