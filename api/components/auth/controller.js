import auth from '../../../auth/index.js'
import bcrypt from 'bcrypt'
import * as dummyStore from '../../../store/dummy.js'
import error from '../../../utils/error.js'
import statusCodes from '../../../utils/statusCodes.js'

const TABLE = 'auth'

export default function controller (store) {
  if (!store) {
    store = dummyStore
  }

  async function login (username, password) {
    const data = await store.query(TABLE, { username })

    //Check if user exists
    if (data.length === 0) {
      throw error('Invalid credentials', statusCodes.BadRequest.code)
    }

    //Check if password is correct
    return bcrypt
      .compare(password, data.password)
      .then(isValid => {
        if (isValid) {
          return auth.signToken(data)
        } else {
          throw error('Invalid credentials', statusCodes.BadRequest.code)
        }
      })
      .then(token => {
        return token
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  async function upsert (data) {
    const authData = {
      id: data.id
    }
    if (data.username) {
      authData.username = data.username
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10)
    }
    return store.upsert(TABLE, authData)
  }

  return {
    login,
    upsert
  }
}
