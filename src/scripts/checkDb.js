import dotenv from 'dotenv'
import { pool } from '../config/db.config.js'

dotenv.config()

async function run() {
  try {
    const result = await pool.query('SELECT NOW() AS server_time, current_database() AS db_name, current_user AS db_user')
    console.log('DB connection OK')
    console.log(result.rows[0])
  } catch (error) {
    console.error('DB connection FAILED')
    console.error(error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

run()
