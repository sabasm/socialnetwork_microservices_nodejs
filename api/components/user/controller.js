import { nanoid } from 'nanoid'
import * as dummyStore from '../../../store/dummy.js'
import auth from '../auth/index.js'

const TABLE = 'user'
const FOLLOW = '_follow'

export default function controller (store) {
  if (!store) {
    store = dummyStore
  }

  function list () {
    return store.list(TABLE) || []
  }
  function get (id) {
    return store.get(TABLE, id)
  }
  async function upsert (body) {
    const user = {
      name: body.name,
      username: body.username
    }
    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    return store.upsert(TABLE, user).then(() => user)
  }
  function remove (id) {
    return store.get(TABLE, id)
  }

  async function follow (from, to) {
    // const user = await get(from)
    // const following = user.following.filter(f => f !== to)
    // following.push(to)
    return store.upsert(TABLE + FOLLOW, {
      user_from: from,
      user_to: to
    })
  }
  
  async function following (id) {
    const join = {}
    join[TABLE] = 'user_to'
    const query = { user_from: id }
    return await store.query(TABLE + FOLLOW, query, join)
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following
  }
}
