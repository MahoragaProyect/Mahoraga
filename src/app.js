import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import questionRoutes from './modules/questions/question.route.js'
import userRoutes from './modules/users/user.route.js'



const app = express()   
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname, '..')
const publicDir = path.join(rootDir, 'public')

app.use(express.json())
app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

app.use('/questions', questionRoutes)
app.use('/users', userRoutes)


export default app
