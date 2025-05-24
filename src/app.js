import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import { connectDb } from './db.js'
import { apiRouter } from './routes/post.routes.js'
import { viewRouter } from './routes/post.view.routes.js' 

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use('/api/post', apiRouter)
app.use('/post', viewRouter)  

connectDb()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})