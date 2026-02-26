import { Client } from "pg"
import dotenv from "dotenv"
dotenv.config()

export const obtenerCategoria = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PWD,
        port: process.env.DB_PORT
    })

    await client.connect()
    console.log("Se realizó una conexión exitosa")

    const res = await client.query('SELECT * FROM question;')
    const result = res.rows

    await client.end()
    return result
}

obtenerCategoria()
    .then(result => console.log(result))
    .catch(error => console.error("Error:", error))