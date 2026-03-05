import express from 'express'
import questionRoutes from './routes/question.route.js'
import userRoutes from './routes/user.route.js'

const app = express()

app.use(express.json())
app.use('/questions', questionRoutes)
app.use('/users', userRoutes)

export default app
