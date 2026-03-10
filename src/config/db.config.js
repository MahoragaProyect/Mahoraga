import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

const isVercel = process.env.VERCEL === '1'
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)
const shouldUseSsl =
    process.env.DB_SSL === 'true' ||
    process.env.PGSSLMODE === 'require' ||
    isVercel

const baseConfig = hasDatabaseUrl
    ? {
          connectionString: process.env.DATABASE_URL
      }
    : {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PWD,
          port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432
      }

const sslConfig = shouldUseSsl
    ? {
          ssl: {
              rejectUnauthorized: false
          }
      }
    : {}

export const pool = new Pool({
    ...baseConfig,
    ...sslConfig
})
