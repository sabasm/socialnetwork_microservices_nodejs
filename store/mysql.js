import mysql2 from 'mysql2'
import { MYSQL } from '../config.js'
import error from '../utils/error.js'

const DB_CONFIG = {
  host: MYSQL.HOST,
  user: MYSQL.USER,
  password: MYSQL.PASSWORD,
  database: MYSQL.DATABASE,
  port: MYSQL.PORT
}

let connection

const handleMySqlConnection = () => {
  connection = mysql2.createConnection(DB_CONFIG)
  connection.connect(err => {
    if (err) {
      handleMySqlConnectionError(err)
    } else {
      console.log('DB Connected!')
    }
  })

  connection.on('error', err => {
    handleMySqlConnectionError(err)
  })
}

const handleMySqlConnectionError = err => {
  console.error('[db error]', err)
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleMySqlConnection()
  } else {
    throw err
  }
}

const list = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM
        ${table}`,
      (error, data) => {
        if (error) return reject(error)
        resolve(data)
      }
    )
  })
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM
        ${table} WHERE id = ${id}`,
      (error, data) => {
        if (error) return reject(error)
        resolve(data)
      }
    )
  })
}

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}
const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

function upsert (table, data) {
  if (data && data.id) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE id = '${id}'`,
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
  })
}

const query = (table, query, join) => {
  let joinQuery = ''
  if (join) {
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table}
        ${joinQuery} WHERE ?`,
      query,
      (error, result) => {
        if (error) return reject(error)
        resolve(result[0] || null)
      }
    )
  })
}

handleMySqlConnection()

export default {
  query,
  remove,
  upsert,
  get,
  list
}
