import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import questionRoutes from './modules/questions/question.route.js'
import userRoutes from './modules/users/user.route.js'



const app = express()   
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname, '..')

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'))
})

//app.use(express.static('index.html')); // tu carpeta HTML/JS


//app.use(express.static(path.join(__dirname, '../public')))
app.use('/questions', questionRoutes)
app.use('/users', userRoutes)


const PORT = process.env.PORT || 3000

// Resto de tu código de configuración y rutas
app.listen(process.env.PORT || 3000, () => {
  console.log('App corriendo');
});

export default app
