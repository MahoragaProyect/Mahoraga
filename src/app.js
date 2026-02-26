import express from 'express'
import questionRoutes from './routes/question.route.js'

const app = express()

app.use(express.json())
app.use('/questions', questionRoutes)

export default app
