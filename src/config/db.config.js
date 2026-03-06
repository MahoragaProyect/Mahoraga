import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    // Conectarse al despliegue en Railway usando la variable de entorno DATABASE_URL
    
    connectionString: process.env.DATABASE_URL, // Railway provee esta variable
    ssl: { rejectUnauthorized: false }
})



