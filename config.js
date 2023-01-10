import { config } from 'dotenv'
config()
export const API = {
  PORT: process.env.PORT || 3000
}
export const JWT = {
  SECRET: process.env.JWT_SECRET
}
export const MYSQL = {
  HOST: process.env.FREE_MYSQL_HOST,
  USER: process.env.FREE_MYSQL_USER,
  PASSWORD: process.env.FREE_MYSQL_PASSWORD,
  DATABASE: process.env.FREE_MYSQL_DATABASE,
  PORT: process.env.FREE_MYSQL_PORT
}
export const MYSQL_SERVICE = {
  API: {
    PORT: process.env.PORT || 3002
  },
  MYSQL: {
    HOST: process.env.FREE_MYSQL_HOST,
    USER: process.env.FREE_MYSQL_USER,
    PASSWORD: process.env.FREE_MYSQL_PASSWORD,
    DATABASE: process.env.FREE_MYSQL_DATABASE,
    PORT: process.env.FREE_MYSQL_PORT
  },
  SERVICE: {
    HOST: process.env.MYSQL_SERVICE_HOST || 'localhost',
    PORT: process.env.MYSQL_SERVICE_PORT || 3002
  }
}
export const POST_SERVICE = {
  API: {
    PORT: process.env.PORT || 3004
  },
  MYSQL: {
    HOST: process.env.FREE_MYSQL_HOST,
    USER: process.env.FREE_MYSQL_USER,
    PASSWORD: process.env.FREE_MYSQL_PASSWORD,
    DATABASE: process.env.FREE_MYSQL_DATABASE,
    PORT: process.env.FREE_MYSQL_PORT
  },
  SERVICE: {
    HOST: process.env.MYSQL_SERVICE_HOST || 'localhost',
    PORT: process.env.MYSQL_SERVICE_PORT || 3002
  }
}
