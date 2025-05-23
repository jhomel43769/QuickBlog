import express from 'express'
import morgan from 'morgan'
import { connectDb } from './db.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("dev"))

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get('/ping', (req, res) => {
    res.send('pong')
})

connectDb()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})