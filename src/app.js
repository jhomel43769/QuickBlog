import express from 'express'
import morgan from 'morgan'
import { connectDb } from './db.js'
import { router } from './routes/post.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("dev"))

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use("/api/post", router)


connectDb()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})