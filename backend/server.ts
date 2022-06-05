import express from 'express'
import router from './routes/books.routes'

const app = express()

app.use(express.json())
app.use('/bm', router)
const PORT = 5690

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})