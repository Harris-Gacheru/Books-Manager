import express from 'express'
import router from './routes/books.routes'
import auth_router from './routes/users.routes'
import cors from 'cors'

const app = express()
const apiRoute = '/api'

app.use(express.json())
app.use(cors())

app.use(apiRoute, router)
app.use(apiRoute, auth_router)

const PORT = 5690

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})