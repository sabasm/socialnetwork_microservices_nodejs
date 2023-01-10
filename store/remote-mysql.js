import remote from '../mysql/remote.js'
import { MYSQL_SERVICE } from '../config.js'

export default new remote(
  MYSQL_SERVICE.SERVICE.HOST,
  MYSQL_SERVICE.SERVICE.PORT
)
