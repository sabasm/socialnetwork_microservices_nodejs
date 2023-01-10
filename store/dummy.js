const db = {
  user: [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
    { id: '3', name: 'James Smith' },
    { id: '4', name: 'Johanna Smith' },
    { id: '5', name: 'Brad Green' }
  ]
}

async function list (table) {
  return db[table]
}

async function get (table, id) {
  let col = await list(table)
  return col.filter(item => item.id === id)[0] || null
}

async function upsert (table, data) {
  if (!db[table]) {
    db[table] = []
  }

  db[table].push(data)

  console.log('db = ', db)
}

async function remove (table, id) {
  //Delete from db
  db[table].filter(item => item.id !== id)
  return true
}
async function query (table, query) {
  let col = await list(table)
  let keys = Object.keys(query)
  let key = keys[0]
  return col.filter(item => item[key] === query[key])[0] || null
}

export default {
  query,
  remove,
  upsert,
  get,
  list
}
